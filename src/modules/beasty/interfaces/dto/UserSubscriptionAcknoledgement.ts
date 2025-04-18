import type { Tier } from '$lib/utils/tier';

export type UserSubscriptionAcknoledgement = {
	userId: string;
	customerId: string;
	tier: Tier;
	subscription: {
		id: string;
		itemId: string;
	};
}
