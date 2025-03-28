import { stripe } from '$lib/server/stripe';
import { env } from '$env/dynamic/private';
import Stripe from 'stripe';
import { AcknowledgeUserSubscriptionUseCase } from '../../../../modules/beasty/usecases/AcknowledgeUserSubscription';
import { getTierByPriceId } from '$lib/data/subscriptionTiers';
import { SQLiteSubscriptionUserRepository } from '../../../../modules/beasty/repositories/SQLiteSubscriptionUserRepository';
import { AcknowledgeUserUpdateSubscriptionUseCase } from '../../../../modules/beasty/usecases/AcknowledgeUserUpdateSubscription';
import { AcknowledgeUserDeleteSubscriptionUseCase } from '../../../../modules/beasty/usecases/AcknowledgeUserDeleteSubscription';

export const POST = async ({ request }) => {
	const event = stripe.webhooks.constructEvent(
		await request.text(),
		request.headers.get('stripe-signature') as string,
		env.STRIPE_WEBHOOK_SECRET
	);

	console.log('Received event:', event.type);

	switch (event.type) {
		case 'customer.subscription.deleted': {
			await handleDelete(event.data.object);
			break;
		}
		case 'customer.subscription.updated': {
			await handleUpdate(event.data.object);
			break;
		}
		case 'customer.subscription.created': {
			await handleCreate(event.data.object);
			break;
		}
	}

	return new Response(null, { status: 200 });
};

async function handleUpdate(subscription: Stripe.Subscription) {
	const tier = getTierByPriceId(subscription.items.data[0].price.id);
	const customer = subscription.customer;
	if (tier == null) {
		return new Response(null, { status: 500 });
	}

	await AcknowledgeUserUpdateSubscriptionUseCase({
		userRepository: SQLiteSubscriptionUserRepository()
	}).execute({
		customerId: typeof customer === 'string' ? customer : customer.id,
		cancelationDate:
			subscription.cancel_at_period_end
				? new Date(subscription.current_period_end! * 1000)
				: null,
		tier
	});
}

async function handleCreate(subscription: Stripe.Subscription) {
	await AcknowledgeUserSubscriptionUseCase({
		userRepository: SQLiteSubscriptionUserRepository()
	}).execute({
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

async function handleDelete(subscription: Stripe.Subscription) {
	const customer = subscription.customer;
	const customerId = typeof customer === 'string' ? customer : customer.id;

	await AcknowledgeUserDeleteSubscriptionUseCase({
		userRepository: SQLiteSubscriptionUserRepository()
	}).execute({ customerId });
}
