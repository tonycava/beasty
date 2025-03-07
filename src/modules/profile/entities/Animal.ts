export type Image = {
	id: string;
	url: string;
	animalId: string;
};

export type Animal = {
	id: string;
	firstName: string;
	birthday: string;
	species: string;
	breed: string;
	sex: string;
	bio: string;
	userId: string;
	images: Image[];
};

export type AnimalWithoutId = Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>;