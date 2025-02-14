import type { Tier } from '$lib/data/subscriptionTiers';

export type UserSubscriptionAcknoledgement = {
	userId: string;
	customerId: string;
	tier: Tier;
	subscription: {
		id: string;
		itemId: string;
	};
}
