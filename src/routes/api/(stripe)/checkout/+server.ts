import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { stripe } from '$lib/server/stripe';
import Stripe from 'stripe';
import { SQLiteUserRepository } from '$auth/repositories/SQLiteUserRepository';

export const POST: RequestHandler = async ({ locals }) => {
	const user = await SQLiteUserRepository().getUserById(locals.user!.id);

	if (!user) {
		return new Response(
			JSON.stringify({
				error: 'User not found'
			}),
			{
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}


	const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
		{
			price: 'price_1QsJpMGgEYrUDoXQMxcZvBnG', // Replace with the actual Price ID from Stripe
			quantity: 1
		}
	];

	console.log("locals.user!.id", locals.user!.id);

	// Create session
	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		customer_email: user.email,
		payment_method_types: ['card'],
		shipping_address_collection: {
			allowed_countries: ['NO']
		},
		subscription_data: {
			metadata: {
				id: locals.user!.id
			}
		},
		metadata: {
			id: locals.user!.id
		},
		mode: 'subscription',
		success_url: `${env.BASE}/`,
		cancel_url: `${env.BASE}/`,
		phone_number_collection: {
			enabled: true
		}
	});

	return new Response(
		JSON.stringify({
			url: session.url
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};
