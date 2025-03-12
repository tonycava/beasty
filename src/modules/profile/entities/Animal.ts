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
	weight: number;
	sex: string;
	bio: string;
	userId: string;
};

export type AnimalItem = Animal & {
	images: Image[];
}

export type AnimalWithoutId = Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>;