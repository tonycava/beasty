import { t } from '$lib/trpc/t';
import { z } from 'zod';
import { CreateAnimalUseCase } from '../usecase/CreateAnimalUseCase';
import { GetAnimalUseCase } from '../usecase/GetAnimalUseCase';
import { GetAnimalsByUserUseCase } from '../usecase/GetAnimalsByUserUseCase';
import { SQLiteAnimalRepository } from '../repositories/SQLiteAnimalRepository';
import { authProcedure } from '$lib/trpc/middlewares/auth.middleware';
import { UpdateAnimalUseCase } from '../usecase/UpdateAnimalUseCase';
import { DeleteAnimalUseCase } from '../usecase/DeleteAnimalUseCase';
import { animalDto } from '../dto/AnimalDto';

export const AnimalRouter = t.router({
	createAnimal: authProcedure
		.input(
			animalDto
		)
		.mutation(async ({ input }) => {
			const createAnimalUseCase = await CreateAnimalUseCase({
				animalRepository: SQLiteAnimalRepository()
			}).execute(input);

			if (createAnimalUseCase.isSuccess) {
				return createAnimalUseCase.data;
			}
			return null;
		}),
	getAnimal: authProcedure.input(z.string().uuid()).query(async ({ input }) => {
		const getAnimalUseCase = await GetAnimalUseCase({
			animalRepository: SQLiteAnimalRepository()
		}).execute(input);

		if (getAnimalUseCase.isSuccess) {
			return getAnimalUseCase.data;
		}
		return null;
	}),
	getAnimalsByUser: authProcedure.input(z.string().uuid()).query(async ({ input }) => {
		const getAnimalsByUserUseCase = await GetAnimalsByUserUseCase({
			animalRepository: SQLiteAnimalRepository()
		}).execute(input);

		if (getAnimalsByUserUseCase.isSuccess) {
			return getAnimalsByUserUseCase.data;
		}
		return null;
	}),
	updateAnimal: authProcedure
		.input(
			animalDto
		)
		.query(async ({ input }) => {
			const updateAnimalUseCase = await UpdateAnimalUseCase({
				animalRepository: SQLiteAnimalRepository()
			}).execute(input);

			if (updateAnimalUseCase.isSuccess) {
				return updateAnimalUseCase.data;
			}
			return null;
		}),
	deleteAnimal: authProcedure.input(z.string().uuid()).query(async ({ input }) => {
		const deleteAnimalUseCase = await DeleteAnimalUseCase({
			animalRepository: SQLiteAnimalRepository()
		}).execute(input);

		if (deleteAnimalUseCase.isSuccess) {
			return deleteAnimalUseCase.data;
		}
		return null;
	})
});
