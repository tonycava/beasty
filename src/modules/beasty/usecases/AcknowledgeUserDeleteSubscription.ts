import {
	type InputFactory,
	type OutputFactory,
	type UseCase,
	UseCaseResponseBuilder
} from '$lib/interfaces/UseCase';
import type {
	ISQLiteSubscriptionUserDeleteSubscription,
} from '../interfaces/ISQLiteSubscriptionUserRepository';
import type { UserSubscriptionAcknoledgement } from '../interfaces/dto/UserSubscriptionAcknoledgement';

type Input = InputFactory<
	Pick<UserSubscriptionAcknoledgement,  'customerId'>,
	{
		userRepository: ISQLiteSubscriptionUserDeleteSubscription;
	}
>;

type Output = OutputFactory<string>;

export const AcknowledgeUserDeleteSubscriptionUseCase: UseCase<Input, Output> = (dependencies) => {
	const { userRepository } = dependencies;
	return {
		async execute(data): Promise<Output> {

			try {
				await userRepository.deleteSubscription(data);
				return UseCaseResponseBuilder.success(200, 'Success');
			} catch (err) {
				console.error('Error :', err);
				return UseCaseResponseBuilder.error(400, "Quelque chose c'est mal passé veuillez réessayer plus tard.");
			}
		}
	};
};
