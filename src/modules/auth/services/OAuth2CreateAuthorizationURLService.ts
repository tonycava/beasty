import { googleOAuth2Client } from '$lib/clients/google';
import { generateState } from 'oslo/oauth2';

type CreateAuthorizationURL = {
	state?: string;
	codeVerifier?: string;
	codeChallengeMethod?: 'S256' | 'plain';
	scopes?: string[];
};

const createGoogleAuthorizationURL = (createAuthorizationURL: CreateAuthorizationURL) => {
	return googleOAuth2Client.createAuthorizationURL(createAuthorizationURL);
};

const generateOauthState = () => {
	return generateState();
}

export default {
	createGoogleAuthorizationURL,
	generateOauthState
};
