export type User = {
	id: string;
	firstName: string;
	lastName: string;
	createdAt?: Date;
	updatedAt?: Date;
	email: string;
	googleUserId: string;
	profilePicture: string;
	bio: string;
	birthday: string;
};

export type UserWhitoutId = Omit<User, 'id'>;
