import { z } from 'zod';

export const userDto = z.object({
    id: z.string().uuid(),
    bio: z.string().min(1, "La biographie est requise"),
});

export type UserDto = z.infer<typeof userDto>;