import type { SubscriptionTier } from '$lib/utils/subscriptionTier';

type Tier = {
	name: string;
	stripePriceId: string | null;
	priceInCents: number;
	description: string;
	features: string[];
	subscriptionTier: SubscriptionTier;
};

export type { Tier };
