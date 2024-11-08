import {
	type InputFactory,
	type OutputFactory,
	type UseCase,
	UseCaseResponseBuilder
} from '$lib/interfaces/UseCase';
import type { ICookieProvider } from '$auth/interfaces/ICookieProvider';
import { COOKEYS } from '$lib/utils/cookies.utils';

type Input = InputFactory<
	void,
	{
		cookieProvider: ICookieProvider;
	}
>;

type Output = OutputFactory<string>;

export const LogoutUseCase: UseCase<Input, Output> = (dependencies) => {
	const { cookieProvider } = dependencies;
	return {
		execute: async () => {
			cookieProvider.remove(COOKEYS.JWT_TOKEN, {path: '/'});
			return UseCaseResponseBuilder.success(200, "Success.");
		}
	};
};
