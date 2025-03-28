import { message, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { animalDto } from '../../modules/profile/dto/AnimalDto';
import { fail } from '@sveltejs/kit';
import { trpc } from '$lib/clients/client';
import { CreateAnimalUseCase } from '../../modules/profile/usecase/CreateAnimalUseCase';
import { SQLiteAnimalRepository } from '../../modules/profile/repositories/SQLiteAnimalRepository';

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
	// Implémenter la modification d'un animal
	},
	updateUser: async (event) => {
	// Implémenter la modification d'un utilisateur (seul la bio peut changer)
	}
};