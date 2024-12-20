import { UseCaseResponseBuilder, type InputFactory, type OutputFactory, type UseCase } from '$lib/interfaces/UseCase';
import type { User } from '../entities/User';
import type { IUserProfileRepositoryGetUser } from '../interfaces/IUserProfileRepository';

type Input = InputFactory<
    string,
    {
        userRepository: IUserProfileRepositoryGetUser;
    }
>;

type Output = OutputFactory<User>;

export const GetUserInfoUseCase: UseCase<Input, Output> = (dependencies) => {
    const { userRepository } = dependencies;
    return {
        execute: async (data) => {
            const user = await userRepository.getUser(data)

            if (!user) {
                return UseCaseResponseBuilder.error(400, "Une erreur est survenue");
            }

            return UseCaseResponseBuilder.success(200, user);
        }
    }
}