import {
	type InputFactory,
	type OutputFactory,
	type UseCase,
	UseCaseResponseBuilder
} from '$lib/interfaces/UseCase';
import type { UserSubscriptionAcknoledgement } from '../interfaces/dto/UserSubscriptionAcknoledgement';
import type { ISQLiteSubscriptionUserCreateSubscription } from '../interfaces/ISQLiteSubscriptionUserRepository';

type Input = InputFactory<
	UserSubscriptionAcknoledgement,
	{
		userRepository: ISQLiteSubscriptionUserCreateSubscription;
	}
>;

type Output = OutputFactory<string>;

export const AcknowledgeUserSubscriptionUseCase: UseCase<Input, Output> = (dependencies) => {
	const { userRepository } = dependencies;
	return {
		async execute(data): Promise<Output> {
			console.log("In usecase");

			try {
				userRepository.createSubscription(data);
				return UseCaseResponseBuilder.success(200, 'Success');
			} catch (err) {
				console.error('Error :', err);
				return UseCaseResponseBuilder.error(400, "Quelque chose c'est mal passé veuillez réessayer plus tard.");
			}
		}
	};
};
