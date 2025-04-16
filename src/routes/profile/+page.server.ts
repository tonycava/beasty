import { message, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { animalDto } from '../../modules/profile/dto/AnimalDto';
import { fail } from '@sveltejs/kit';
import { trpc } from '$lib/clients/client';
import { CreateAnimalUseCase } from '../../modules/profile/usecase/CreateAnimalUseCase';
import { SQLiteAnimalRepository } from '../../modules/profile/repositories/SQLiteAnimalRepository';
import { userDto } from '../../modules/profile/dto/UserDto';
import { UpdateUserUseCase } from '../../modules/profile/usecase/UpdateUserUseCase';
import { SQLiteUserProfileRepository } from '../../modules/profile/repositories/SQLiteUserProfileRepository';
import { UpdateAnimalUseCase } from '../../modules/profile/usecase/UpdateAnimalUseCase';

export const load = async () => {
	const form = await superValidate(zod(animalDto));

	return { form };
};

export const actions = {
	addPet: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(animalDto));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const createAnimalUseCase = await CreateAnimalUseCase({
			animalRepository: SQLiteAnimalRepository()
		}).execute(form.data);

		if (createAnimalUseCase.isSuccess) {
			return createAnimalUseCase.data;
		}

		return message(form, 'Form posted successfully!');
	},


	updatePet: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(animalDto));

		if(!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const updateAnimalUseCase = await UpdateAnimalUseCase({
			animalRepository: SQLiteAnimalRepository()
		}).execute(form.data);

		if(updateAnimalUseCase.isSuccess) {
			return updateAnimalUseCase.data;
		}

		return message(form, 'Form posted successfully!');
	},

	
	updateUser: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(userDto));

		if(!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const updateUserUseCase = await UpdateUserUseCase({
			userRepository: SQLiteUserProfileRepository()
		}).execute(form.data);

		if(updateUserUseCase.isSuccess) {
			return updateUserUseCase.data;
		}

		return message(form, 'Form posted successfully!');
	}
};