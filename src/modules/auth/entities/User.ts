export type User = {
	id: string;
	firstName: string;
	lastName: string;
	createdAt?: Date;
	updatedAt?: Date;
	email: string;
	googleUserId: string;
	profilePicture: string;
};

export type UserWhitoutId = Omit<User, 'id'>;
