import type { UserDto } from "../dto/UserDto";
import type { User } from "../entities/User";


export type IUserProfileRepositoryGetUser = {
    getUser(userId: string): Promise<User | null>;
};

export type IUserProfileRepositoryUpdateUser = {
    updateUser(user: UserDto): Promise<void>;
};


export type IUserProfileRepository = IUserProfileRepositoryGetUser &
    IUserProfileRepositoryUpdateUser;
