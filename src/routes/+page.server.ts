import { googleOAuth2Client } from '$lib/clients/google';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const url = await googleOAuth2Client.createAuthorizationURL({
		scopes: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/user.emails.read',
			'https://www.googleapis.com/auth/user.birthday.read'
		]
	});

	return { url: url.toString() };
};
