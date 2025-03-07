import type { IAnimalRepository } from '../interfaces/IAnimalRepository';
import type { Animal } from '../entities/Animal';
import type { AnimalDto } from '../dto/AnimalDto';
import prisma from '$lib/server/db';

type _SQLiteAnimalRepository = IAnimalRepository;

export const SQLiteAnimalRepository = (): _SQLiteAnimalRepository => {
	return {
		async createAnimal(animalData: AnimalDto): Promise<Animal> {
			const { images, ...animalDetails } = animalData;

			return prisma.animal.create({
				data: {
					...animalDetails,
					images: {
						create: images
					}
				}
			});
		},
		async getAnimal(animalId: string): Promise<Animal | null> {
			return prisma.animal.findUnique({
				where: {
					id: animalId
				},
				include: {
					images: true
				}
			});
		},
		async getAnimalsByUser(userId: string): Promise<Animal[]> {
			return prisma.animal.findMany({
				where: {
					userId
				},
				include: {
					images: true
				}
			});
		},
		async updateAnimal(animal: Animal): Promise<void> {
			const { id, images, ...animalDetails } = animal;

			await prisma.animal.update({
				where: {
					id
				},
				data: {
					...animalDetails,
					images: {
						deleteMany: {
							animalId: id
						},
						create: images
					}
				}
			});
		},
		async deleteAnimal(animalId: string): Promise<void> {
			await prisma.animal.delete({
				where: {
					id: animalId
				}
			});
		}
	};
}