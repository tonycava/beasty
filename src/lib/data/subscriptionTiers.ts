import { env } from '$env/dynamic/private';

export type Tier = {
	name: string;
	stripePriceId: string | null;
}

export const subscriptionTiers: Record<string, Tier> = {
	Free: {
		name: "Free",
		stripePriceId: null,
	},
	Premium: {
		name: "Premium",
		stripePriceId: env.STRIPE_PREMIUM_PLAN_STRIPE_PRICE_ID,
	},
} as const

export const subscriptionTiersInOrder = [
	subscriptionTiers.Free,
	subscriptionTiers.Premium,
] as const


export function getTierByPriceId(stripePriceId: string) {
	return Object.values(subscriptionTiers).find(
		tier => tier.stripePriceId === stripePriceId
	)
}
