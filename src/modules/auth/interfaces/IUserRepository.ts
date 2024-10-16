import type { User, UserWhitoutId } from '$auth/entities/User';

export interface IUserRepositoryCreateUser {
	createUser(user: UserWhitoutId): Promise<User>;
}

export type IUserRepositoryGetByAccessToken = {
	getGoogleUserWithAccessToken(accessToken: string): Promise<UserWhitoutId>;
};

export type IUserRepositoryGetUser = {
	getUser(identifier?: string): Promise<UserWhitoutId>;
};

export type IUserRepositoryGetById = {
	getUserByGoogleId(id: string): Promise<User | null>;
};

export type IUserRepositoryGetByEmail = {
	getApprenticeByEmail(email: string): Promise<User | null>;
};

export type IUserRepository = IUserRepositoryCreateUser &
	IUserRepositoryGetByAccessToken &
	IUserRepositoryGetById &
	IUserRepositoryGetByEmail &
	IUserRepositoryGetUser;
