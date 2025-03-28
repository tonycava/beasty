import type { IUserRepository } from '$auth/interfaces/IUserRepository';
import { googleOAuth2Client } from '$lib/clients/google';
import { env } from '$env/dynamic/private';
import type { GoogleUserProfile } from '$auth/entities/GoogleUser';

type _GoogleUserRepository = Pick<IUserRepository, 'getGoogleUserWithAccessToken' | 'getUser'>;

export const GoogleUserRepository = (): _GoogleUserRepository => {
	return {
		getUser: async (identifier) => {
			const { access_token } = await googleOAuth2Client.validateAuthorizationCode(
				identifier ?? '',
				{
					credentials: env.GOOGLE_CLIENT_SECRET,
					authenticateWith: 'request_body'
				}
			);
			const giteaUserRepository = GoogleUserRepository();
			return giteaUserRepository.getGoogleUserWithAccessToken(access_token);
		},
		getGoogleUserWithAccessToken: async (accessToken: string) => {
			const userProfileResponse = await fetch(
				`https://people.googleapis.com/v1/people/me?personFields=birthdays,names,photos,emailAddresses`,
				{
					method: "GET",
					headers: { Authorization: `Bearer ${accessToken}` }
				}
			);

			const userProfile = (await userProfileResponse.json()) as GoogleUserProfile;

			console.log(userProfile);

			const userInfo = userProfile.names[0];
			const userPhoto = userProfile.photos[0];
			const userEmail = userProfile.emailAddresses[0];
			const userBirthday = userProfile.birthdays[0].date;

			return {
				firstName: userInfo.givenName,
				lastName: userInfo.familyName,
				email: userEmail.value,
				googleUserId: userInfo.metadata.source.id,
				profilePicture: userPhoto.url,
				birthday: `${userBirthday.day}/${userBirthday.month}/${userBirthday.year}`,
				bio: "",
			};
		}
	};
};
