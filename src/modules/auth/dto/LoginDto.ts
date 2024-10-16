import z from 'zod';

export const loginDto = z.object({
	code: z.string().min(1)
});

export type LoginDto = z.infer<typeof loginDto>;
