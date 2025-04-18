import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {

	const user = locals.user;

	console.log('user', user);
	if (user && url.pathname === '/') {
		throw redirect(302, '/beastyMatcher');
	}

	return {
		url: url.href,
	};
};
