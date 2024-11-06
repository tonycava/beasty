import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import { LoginUseCase } from '$auth/usecases/AuthenticateUser';
import { SQLiteUserRepository } from '$auth/repositories/SQLiteUserRepository';
import { JWTAuthTokenProvider } from '$auth/services/JWTAuthTokenProvider';
import { GoogleUserRepository } from '$auth/repositories/GoogleUserRepository';
import { COOKEYS } from '$lib/utils/cookies.utils';
import { UseCaseResponseBuilder } from '$lib/interfaces/UseCase';
import { ApiResponse } from '$lib/utils/svelte.utils';
import { CheckBodyMiddleware } from '$lib/services/ZodBodyParser';
import { loginDto, type LoginDto } from '$auth/dto/LoginDto';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const storedState = cookies.get(COOKEYS.GOOGLE_OAUTH_STATE) ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		const useCaseError = UseCaseResponseBuilder.error(
			400,
			'You need to grant permission to Beasty to access your google account.'
		);
		return ApiResponse.send(useCaseError);
	}


	const params = Object.fromEntries([...url.searchParams.entries()]);

	const checkBodyMiddleware = await CheckBodyMiddleware<LoginDto>(params, loginDto);
	if (!checkBodyMiddleware.isSuccess) {
		return ApiResponse.send(checkBodyMiddleware);
	}

	const loginUseCase = await LoginUseCase({
		userRepository: SQLiteUserRepository(),
		tokenProvider: JWTAuthTokenProvider(),
		getUser: GoogleUserRepository().getUser
	}).execute(checkBodyMiddleware.data);

	if (!loginUseCase.isSuccess) {
		return error(500);
	}

	cookies.set(COOKEYS.JWT_TOKEN, loginUseCase.data, { path: '/' });
	return redirect(303, '/');
};
