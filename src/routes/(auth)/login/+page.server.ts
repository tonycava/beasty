import type { PageServerLoad } from './$types';
import OAuth2CreateAuthorizationURLService from '$auth/services/OAuth2CreateAuthorizationURLService';
import { COOKEYS } from '$lib/utils/cookies.utils';

export const load: PageServerLoad = async (event) => {
	const state = OAuth2CreateAuthorizationURLService.generateOauthState();

	const url = await OAuth2CreateAuthorizationURLService.createGoogleAuthorizationURL({
		scopes: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/user.emails.read',
			'https://www.googleapis.com/auth/user.birthday.read'
		],
		state
	});

	event.cookies.set(COOKEYS.GOOGLE_OAUTH_STATE, state, {
		path: '/',
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	return { url: url.toString() };
};
