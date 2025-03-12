import type { IAnimalRepository } from '../interfaces/IAnimalRepository';
import type { AnimalItem } from '../entities/Animal';
import type { AnimalDto } from '../dto/AnimalDto';
import prisma from '$lib/server/db';
import { uploadToS3 } from '$lib/utils/s3UploadImage';

type _SQLiteAnimalRepository = IAnimalRepository;

export const SQLiteAnimalRepository = (): _SQLiteAnimalRepository => {
	return {
		async createAnimal(animalData: AnimalDto): Promise<AnimalItem> {
			const {images, ...animalDetails } = animalData;

			const animal = await prisma.animal.create({
				include: { images: true },
				data: animalDetails,
			});

			const images2 = await Promise.all(images.map(async (image) => {
				const url = await uploadToS3(image);
				await prisma.image.create({
					data: {
						url: url!,
						animal: {
							connect: {
								id: animal.id
							}
						}
					}
				});
			}));

			return animal;
		},
		async getAnimal(animalId: string): Promise<AnimalItem | null> {
			return prisma.animal.findUnique({
				where: {
					id: animalId
				},
				include: {
					images: true
				}
			});
		},
		async getAnimalsByUser(userId: string): Promise<AnimalItem[]> {
			return prisma.animal.findMany({
				where: {
					userId
				},
				include: {
					images: true
				}
			});
		},
		async updateAnimal(animal: AnimalDto): Promise<void> {
			const {id, images, ...animalDetails } = animal;

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