import type { ISQLiteSubscriptionUserRepository } from '../interfaces/ISQLiteSubscriptionUserRepository';
import prisma from '$lib/server/db';

export const SQLiteSubscriptionUserRepository = (): ISQLiteSubscriptionUserRepository => {

	return {
		createSubscription(data): void {
			console.log("Creating subscription for user (createSubscription)", data);
			prisma.user.update({
				data: {
					subscription: {
						create: {
							stripeSubscriptionItemId: data.subscription.itemId,
							stripeSubscriptionId: data.subscription.id,
							stripeCustomerId: data.customerId,
							tier: data.tier.name,
						},
					}
				},
				where: { id: data.userId }
			}).then(console.log)
			.catch(console.error);
		}

	}
}
