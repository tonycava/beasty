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
				success_url: `${env.BASE}/`,
				cancel_url: `${env.BASE}/`,
				phone_number_collection: {
					enabled: true
				}
			});

			return session.url;
		})
});
