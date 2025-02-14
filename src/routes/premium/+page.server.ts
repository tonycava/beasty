import { subscriptionTiers, subscriptionTiersInOrder } from '$lib/data/subscriptionTiers';
import type { PageServerLoad } from './$types';
import { trpc } from '$lib/clients/client';

export const load: PageServerLoad = async (event) => {
	const userSubscriptionTier = await trpc(event).subscriptionRouter.getTier.query();

	console.log(userSubscriptionTier);
	return {
		userSubscriptionTier,
		paidTiers: subscriptionTiersInOrder.filter((tier) => tier !== subscriptionTiers.Free),
	};
};
