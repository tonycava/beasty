export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	bio: string;
	birthday: string;
};

export type UserWhitoutId = Omit<User, 'id'>;
