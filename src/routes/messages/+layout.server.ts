import type { LayoutServerLoad } from '../../../.svelte-kit/types/src/routes/$types';
import { GetMyMatchesUseCase } from '../../modules/matcher/usecases/GetMyMatchesUseCase.ts';
import { SQLiteMatcherRepositoryGet } from '../../modules/matcher/repositories/SQLiteMatcherRepositoryGet.ts';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) return redirect(303, '/login');

	const getMyMatchesUseCase = await GetMyMatchesUseCase({
		matcherRepositoryGet: SQLiteMatcherRepositoryGet()
	}).execute(locals.user.id);

	if (!getMyMatchesUseCase.isSuccess) {
		return [];
	}

	return {
		matches: getMyMatchesUseCase.data
	};
};
