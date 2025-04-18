import { z } from 'zod';

export const animalDto = z.object({
	id: z.string().uuid(),
	firstName: z.string().min(1, "Le nom est requis"),
	birthday: z.string().min(1, "La date de naissance est requise"),
	species: z.string().min(1, "L'espèce est requise"),
	breed: z.string().min(1, "La race est requise"),
	weight: z.number().min(1, "Le poids est requis"),
	sex: z.string().min(1, "Le sexe est requis"),
	bio: z.string().min(1, "La biographie est requise"),
	userId: z.string().min(1, "ID utilisateur manquant"),
	images: z.instanceof(File, { message: 'Please upload a file.'}).array()
});

export type AnimalDto = z.infer<typeof animalDto>;