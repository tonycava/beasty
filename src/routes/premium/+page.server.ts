import { subscriptionTiers, subscriptionTiersInOrder } from '$lib/data/subscriptionTiers';
import type { PageServerLoad } from './$types';
import { trpc } from '$lib/clients/client';

export const load: PageServerLoad = async (event) => {
	const [userSubscriptionTier, userSubscriptionCancelationDate] = await Promise.all([
			trpc(event).subscriptionRouter.getTier.query(),
			trpc(event).subscriptionRouter.getCancelationDate.query(),
		])

	return {
		userSubscriptionTier,
		userSubscriptionCancelationDate,
		paidTiers: subscriptionTiersInOrder.filter((tier) => tier !== subscriptionTiers.Free),
	};
};
