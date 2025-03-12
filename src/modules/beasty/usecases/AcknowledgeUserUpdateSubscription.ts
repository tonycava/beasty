import {
	type InputFactory,
	type OutputFactory,
	type UseCase,
	UseCaseResponseBuilder
} from '$lib/interfaces/UseCase';
import type { UserSubscriptionAcknoledgement } from '../interfaces/dto/UserSubscriptionAcknoledgement';
import type {
	ISQLiteSubscriptionUserUpdateSubscription
} from '../interfaces/ISQLiteSubscriptionUserRepository';

type Input = InputFactory<
	Pick<UserSubscriptionAcknoledgement, "tier" | "customerId"> & {cancelationDate: Date | null},
	{
		userRepository: ISQLiteSubscriptionUserUpdateSubscription;
	}
>;

type Output = OutputFactory<string>;

export const AcknowledgeUserUpdateSubscriptionUseCase: UseCase<Input, Output> = (dependencies) => {
	const { userRepository } = dependencies;
	return {
		async execute(data): Promise<Output> {
			try {
				await userRepository.updateSubscription(data);

				return UseCaseResponseBuilder.success(200, 'Success');
			} catch (err) {
				console.error('Error :', err);
				return UseCaseResponseBuilder.error(400, "Quelque chose c'est mal passé veuillez réessayer plus tard.");
			}
		}
	};
};
