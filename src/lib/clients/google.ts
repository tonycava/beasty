import { OAuth2Client } from 'oslo/oauth2';
import { env } from '$env/dynamic/private';

export const googleOAuth2Client = new OAuth2Client(
	env.GOOGLE_CLIENT_ID!,
	"https://accounts.google.com/o/oauth2/v2/auth",
	"https://oauth2.googleapis.com/token",
	{
		redirectURI: "http://localhost:5173/api/oauth/callback/google"
	});
