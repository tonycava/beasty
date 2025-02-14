import type { User } from "../entities/User";


export type IUserProfileRepositoryGetUser = {
    getUser(userId: string): Promise<User | null>;
};


export type IUserProfileRepository = IUserProfileRepositoryGetUser;
