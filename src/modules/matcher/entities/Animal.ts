export type Animal = {
    id: string;
    name: string;
};

export type AnimalWhitoutId = Omit<Animal, 'id'>;