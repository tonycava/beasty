export type Animal = {
	sex: any;
	breed: any;
	species: any;
	bio: any;
	birthday: any;
	firstName: any;
    id: string;
};

export type AnimalWhitoutId = Omit<Animal, 'id'>;