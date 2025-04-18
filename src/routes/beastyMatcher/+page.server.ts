import type { PageServerLoad } from './$types';
import { GetAnimalsByUserUseCase } from '../../modules/profile/usecase/GetAnimalsByUserUseCase.ts';
import { redirect } from '@sveltejs/kit';
import { SQLiteAnimalRepository } from '../../modules/profile/repositories/SQLiteAnimalRepository.ts';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return redirect(303, '/login');

	const myAnimals = await GetAnimalsByUserUseCase({
		animalRepository: SQLiteAnimalRepository()
	}).execute(locals.user.id);

	if (!myAnimals.isSuccess)
		return redirect(303, '/login');

	if (myAnimals.data.length === 0)
		return redirect(303, '/profile?empty=true');

	return {};
};
