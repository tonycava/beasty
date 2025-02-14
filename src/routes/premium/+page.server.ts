import { subscriptionTiers } from '$lib/data/subscriptionTiers';

export const load = async () => {
	const paidTiers = [
		subscriptionTiers.Essentiel,
		subscriptionTiers.Premium,
		subscriptionTiers.Business
	];

	return {
		paidTiers
	};
};