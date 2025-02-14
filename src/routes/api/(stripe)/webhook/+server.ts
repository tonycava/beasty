import { stripe } from '$lib/server/stripe';
import { env } from '$env/dynamic/private';
import Stripe from 'stripe';
import { AcknowledgeUserSubscriptionUseCase } from '../../../../modules/beasty/usecases/AcknowledgeUserSubscription';
import { getTierByPriceId } from '$lib/data/subscriptionTiers';
import {
	SQLiteSubscriptionUserRepository
} from '../../../../modules/beasty/repositories/SQLiteSubscriptionUserRepository';

export const POST = async ({ request }) => {
	const event = stripe.webhooks.constructEvent(
		await request.text(),
		request.headers.get('stripe-signature') as string,
		env.STRIPE_WEBHOOK_SECRET
	);

	console.log('Received event:', event.type);

	switch (event.type) {
		case 'customer.subscription.created': {
			await handleCreate(event.data.object);
			break;
		}
	}

	return new Response(null, { status: 200 });
};

async function handleCreate(subscription: Stripe.Subscription) {
	console.log("subscription.metadata", subscription.metadata);
	await AcknowledgeUserSubscriptionUseCase({ userRepository: SQLiteSubscriptionUserRepository() }).execute({
		userId: subscription.metadata.id,
		customerId:
			typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
		tier: getTierByPriceId(subscription.items.data[0].price.id)!,
		subscription: {
			id: subscription.id,
			itemId: subscription.items.data[0].id
		}
	});
}
