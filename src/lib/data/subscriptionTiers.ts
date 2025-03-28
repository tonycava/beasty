import { env } from '$env/dynamic/private';
import { SubscriptionTier } from '$lib/utils/subscriptionTier';
import type { Tier } from '$lib/utils/tier';

export const subscriptionTiers: Record<SubscriptionTier, Tier> = {
	[SubscriptionTier.Free]: {
		name: "Free",
		stripePriceId: null,
		priceInCents: 0,
		description: "Gratuit pour toujours",
		features: [
			"Création de profil",
			"1 photo d'animal",
			"3 matchs par jour"
		],
		subscriptionTier: SubscriptionTier.Free
	},
	[SubscriptionTier.Essentiel]: {
		name: "Essentiel",
		stripePriceId: env.STRIPE_ESSENTIEL_PLAN_STRIPE_PRICE_ID,
		priceInCents: 499,
		description: "Parfait pour commencer",
		features: [
			"Personnalisation basique du profil",
			"Jusqu'à 3 photos d'animaux",
			"10 matchs par jour"
		],
		subscriptionTier: SubscriptionTier.Essentiel
	},
	[SubscriptionTier.Premium]: {
		name: "Premium",
		stripePriceId: env.STRIPE_PREMIUM_PLAN_STRIPE_PRICE_ID,
		priceInCents: 999,
		description: "Idéal pour les passionnés d'animaux",
		features: [
			"Tous les avantages Essentiel",
			"Photos d'animaux illimitées",
			"Matchs illimités",
			"Filtres avancés",
			"Support prioritaire"
		],
		subscriptionTier: SubscriptionTier.Premium
	},
	[SubscriptionTier.Business]: {
		name: "Business",
		stripePriceId: env.STRIPE_BUSINESS_PLAN_STRIPE_PRICE_ID,
		priceInCents: 9999,
		description: "Pour ceux qui veulent aller plus loin",
		features: [
			"Tous les avantages Premium",
			"Badge Business",
			"Annonces mises en avant",
			"Tableau de bord analytique"
		],
		subscriptionTier: SubscriptionTier.Business
	}
} as const;

export const subscriptionTiersInOrder = [
	subscriptionTiers.Free,
	subscriptionTiers.Essentiel,
	subscriptionTiers.Premium,
	subscriptionTiers.Business,
] as const

export function getTierByPriceId(stripePriceId: string): Tier | undefined {
	return Object.values(subscriptionTiers).find(
		tier => tier.stripePriceId === stripePriceId
	);
}
