import { type InputFactory, type OutputFactory, type UseCase, UseCaseResponseBuilder } from '$lib/interfaces/UseCase';
import type { UserDto } from '../dto/UserDto';
import type { IUserProfileRepositoryUpdateUser } from '../interfaces/IUserProfileRepository';

type Input = InputFactory<
    UserDto,
    {
        userRepository: IUserProfileRepositoryUpdateUser;
    }
>;

type Output = OutputFactory<void>;

export const UpdateUserUseCase: UseCase<Input, Output> = (dependencies) => {
    const { userRepository } = dependencies;

    return {
        execute: async (data: UserDto) => {
            try {
                await userRepository.updateUser(data);

                return UseCaseResponseBuilder.success(200, undefined);
            } catch (error) {
                console.error('Error in UpdateUserUseCase:', error);
                return UseCaseResponseBuilder.error(500, "Une erreur est survenue lors de la mise à jour du profil utilisateur");
            }
        }
    };
};