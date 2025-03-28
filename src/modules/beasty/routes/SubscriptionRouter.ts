import { publicProcedure, t } from '$lib/trpc/t';
import prisma from '$lib/server/db';
import { SubscriptionTier, SubscriptionTierUtil } from '$lib/utils/subscriptionTier';
import { authProcedure } from '$lib/trpc/middlewares/auth.middleware';
import { stripe } from '$lib/server/stripe';
import { env } from '$env/dynamic/private';
import { z } from 'zod';
import { subscriptionTiers } from '$lib/data/subscriptionTiers';

export const SubscriptionRouter = t.router({
	getTier: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.user) return SubscriptionTier.Free;

		const userSubscription = await prisma.subscription.findFirst({
			select: { tier: true },
			where: { userId: ctx.user.id }
		});

		if (!userSubscription) return SubscriptionTier.Free;
		return SubscriptionTierUtil.fromString(userSubscription.tier);
	}),
	getCancelationDate: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.user) return null;

		const userSubscription = await prisma.subscription.findFirst({
			select: { stripeCancelAtPeriodEnd: true },
			where: { userId: ctx.user.id }
		});

		if (!userSubscription?.stripeCancelAtPeriodEnd) return null;

		return userSubscription.stripeCancelAtPeriodEnd;
	}),
	createCustomerPortalSession: authProcedure.query(async ({ ctx }) => {
		const userSubscription = await prisma.subscription.findFirst({
			select: { stripeCustomerId: true },
			where: { userId: ctx.user.id }
		});

		if (!userSubscription) return null;

		const portalSession = await stripe.billingPortal.sessions.create({
			customer: userSubscription.stripeCustomerId,
			return_url: `${env.BASE}/premium`
		});

		return portalSession.url;
	}),
	getSubscriptionUpgradeSession: authProcedure
		.input(z.object({ tier: z.nativeEnum(SubscriptionTier) }))
		.query(async ({ ctx, input }) => {
			const userSubscription = await prisma.subscription.findFirst({
				where: { userId: ctx.user.id }
			});

			if (!userSubscription) return null;

			const portalSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: `${env.BASE}/premium`,
				flow_data: {
					type: 'subscription_update_confirm',
					subscription_update_confirm: {
						subscription: userSubscription.stripeSubscriptionId,
						items: [
							{
								id: userSubscription.stripeSubscriptionItemId,
								price: subscriptionTiers[input.tier].stripePriceId!,
								quantity: 1
							}
						]
					}
				}
			});

			return portalSession.url;
		}),
	getCheckoutSession: authProcedure
		.input(z.object({ tier: z.nativeEnum(SubscriptionTier) }))
		.query(async ({ ctx, input }) => {
			const customerList = await stripe.customers.list({
				email: ctx.user.email,
				limit: 1
			});

			let customerId = '';
			// Checks the if the customer exists, if not creates a new customer
			if (customerList.data.length !== 0) {
				customerId = customerList.data[0].id;
			} else {
				const customer = await stripe.customers.create({
					email: ctx.user.email
				});
				customerId = customer.id;
			}

			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						price: subscriptionTiers[input.tier].stripePriceId!,
						quantity: 1
					}
				],
				customer: customerId,
				payment_method_types: ['card'],
				shipping_address_collection: {
					allowed_countries: ['NO']
				},
				subscription_data: {
					metadata: {
						id: ctx.user.id
					}
				},
				metadata: {
					id: ctx.user.id
				},
				mode: 'subscription',
				success_url: `${env.BASE}/premium`,
				cancel_url: `${env.BASE}/premium`,
				phone_number_collection: {
					enabled: true
				}
			});

			return session.url;
		})
});
