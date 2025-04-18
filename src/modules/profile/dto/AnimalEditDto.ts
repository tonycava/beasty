import { z } from 'zod';

export const animalEditDto = z.object({
    id: z.string().uuid(),
    bio: z.string(),
});

export type AnimalEditDto = z.infer<typeof animalEditDto>;