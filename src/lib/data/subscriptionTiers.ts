import { env } from '$env/dynamic/private';

export type Tier = {
	name: string;
	stripePriceId: string | null;
	priceInCents: number;
	description: string;
	features: string[];
}

export const subscriptionTiers: Record<string, Tier> = {
	Free: {
		name: "Free",
		stripePriceId: null,
		priceInCents: 0,
		description: "Gratuit pour toujours",
		features: [
			"Création de profil",
			"1 photo d'animal",
			"3 matchs par jour"
		]
	},
	Essentiel: {
		name: "Essentiel",
		stripePriceId: null,
		priceInCents: 999,
		description: "Parfait pour commencer",
		features: [
			"Personnalisation basique du profil",
			"Jusqu'à 3 photos d'animaux",
			"10 matchs par jour"
		]
	},
	Premium: {
		name: "Premium",
		stripePriceId: env.STRIPE_PREMIUM_PLAN_STRIPE_PRICE_ID,
		priceInCents: 1999,
		description: "Idéal pour les passionnés d'animaux",
		features: [
			"Tous les avantages Essentiel",
			"Photos d'animaux illimitées",
			"Matchs illimités",
			"Filtres avancés",
			"Support prioritaire"
		]
	},
	Business: {
		name: "Business",
		stripePriceId: env.STRIPE_BUSINESS_PLAN_STRIPE_PRICE_ID,
		priceInCents: 4999,
		description: "Pour ceux qui veulent aller plus loin",
		features: [
			"Tous les avantages Premium",
			"Badge Business",
			"Annonces mises en avant",
			"Tableau de bord analytique"
		]
	}
} as const;

export function getTierByPriceId(stripePriceId: string): Tier | undefined {
	return Object.values(subscriptionTiers).find(
		tier => tier.stripePriceId === stripePriceId
	);
}