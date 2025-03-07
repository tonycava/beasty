import { z } from 'zod';

export const animalDto = z.object({
		firstName: z.string().min(1),
		birthday: z.string().min(1),
		species: z.string().min(1),
		breed: z.string().min(1),
		sex: z.string().min(1),
		bio: z.string(),
		userId: z.string(),
		images: z.array(z.object({
			url: z.string().min(1)
		}))
});

export type AnimalDto = z.infer<typeof animalDto>;