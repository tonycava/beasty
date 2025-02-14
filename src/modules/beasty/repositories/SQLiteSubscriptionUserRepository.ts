import type { ISQLiteSubscriptionUserRepository } from '../interfaces/ISQLiteSubscriptionUserRepository';
import prisma from '$lib/server/db';
import { subscriptionTiers } from '$lib/data/subscriptionTiers';

export const SQLiteSubscriptionUserRepository = (): ISQLiteSubscriptionUserRepository => {
	return {
		async deleteSubscription(data): Promise<void> {
			await prisma.subscription.update({
				data: {
					tier: subscriptionTiers.Free.name,
					stripeSubscriptionId: '',
					stripeSubscriptionItemId: ''
				},
				where: { stripeCustomerId: data.customerId }
			});
		},
		async updateSubscription(data): Promise<void> {
			const existingSubscription = await prisma.subscription.findUnique({
				where: { stripeCustomerId: data.customerId },
			});

			if (!existingSubscription) return;

			await prisma.subscription.update({
				data: {
					tier: data.tier.name
				},
				where: { stripeCustomerId: data.customerId }
			});
		},
		async createSubscription(data): Promise<void> {
			await prisma.subscription.upsert({
				where: { stripeCustomerId: data.customerId },
				update: {
					stripeSubscriptionItemId: data.subscription.itemId,
					stripeSubscriptionId: data.subscription.id,
					stripeCustomerId: data.customerId,
					tier: data.tier.name,
					userId: data.userId,
				},
				create: {
					stripeSubscriptionItemId: data.subscription.itemId,
					stripeSubscriptionId: data.subscription.id,
					stripeCustomerId: data.customerId,
					tier: data.tier.name,
					userId: data.userId,
				},
			});
		}
	};
};
