import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { env } from '$env/dynamic/private';
import { COOKEYS } from '$lib/utils/cookies.utils';
import jwt from 'jsonwebtoken';
import type { AuthTokenPayload } from '$auth/entities/JwtPayload';
import { sequence } from '@sveltejs/kit/hooks';

export const handleCookies: Handle = ({ event, resolve }) => {
	const jwtToken = event.cookies.get(COOKEYS.JWT_TOKEN);

	try {
		const payload = jwt.verify(jwtToken ?? '', env.JWT_SECRET ?? '') as unknown as AuthTokenPayload;
		event.locals.user = payload;
	} catch {
		event.locals.user = null;
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleCookies, createTRPCHandle({ router, createContext }));
