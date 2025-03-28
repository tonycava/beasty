import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const users = await prisma.user.createMany({
		data: [
			{
				googleUserId: 'user1-google-id',
				firstName: 'Alice',
				lastName: 'Smith',
				email: 'alice@example.com',
				profilePicture: 'url_to_picture1',
				birthday: '1995-05-15',
				bio: 'I love animals!'
			},
			{
				googleUserId: 'user2-google-id',
				firstName: 'Bob',
				lastName: 'Johnson',
				email: 'bob@example.com',
				profilePicture: 'url_to_picture2',
				birthday: '1992-08-20',
				bio: 'Animal lover and photographer.'
			},
			{
				googleUserId: 'user3-google-id',
				firstName: 'Charlie',
				lastName: 'Brown',
				email: 'charlie@example.com',
				profilePicture: 'url_to_picture3',
				birthday: '1988-12-10',
				bio: 'Outdoor enthusiast.'
			},
			{
				googleUserId: 'user4-google-id',
				firstName: 'Diane',
				lastName: 'Miller',
				email: 'diane@example.com',
				profilePicture: 'url_to_picture4',
				birthday: '1990-03-25',
				bio: 'Loves hiking with pets.'
			},
			{
				googleUserId: 'user5-google-id',
				firstName: 'Eve',
				lastName: 'Davis',
				email: 'eve@example.com',
				profilePicture: 'url_to_picture5',
				birthday: '1997-07-07',
				bio: 'Passionate about animal rescue.'
			},
			{
				googleUserId: 'user6-google-id',
				firstName: 'Frank',
				lastName: 'Garcia',
				email: 'frank@example.com',
				profilePicture: 'url_to_picture6',
				birthday: '1993-04-12',
				bio: 'Adventurer and nature lover.'
			},
			{
				googleUserId: 'user7-google-id',
				firstName: 'George',
				lastName: 'Hernandez',
				email: 'george@example.com',
				profilePicture: 'url_to_picture7',
				birthday: '1991-09-30',
				bio: 'Animal enthusiast and photographer.'
			},
			{
				googleUserId: 'user8-google-id',
				firstName: 'Helen',
				lastName: 'Lopez',
				email: 'helen@example.com',
				profilePicture: 'url_to_picture8',
				birthday: '1989-11-18',
				bio: 'Pet lover and nature enthusiast.'
			},
			{
				googleUserId: 'user9-google-id',
				firstName: 'Ian',
				lastName: 'Moore',
				email: 'ian@example.com',
				profilePicture: 'url_to_picture9',
				birthday: '1994-02-28',
				bio: 'Animal lover and photographer.'
			},
			{
				googleUserId: 'user10-google-id',
				firstName: 'Jane',
				lastName: 'Nelson',
				email: 'jane@example.com',
				profilePicture: 'url_to_picture10',
				birthday: '1996-06-14',
				bio: 'Passionate about animal welfare.'
			},
			{
				googleUserId: 'user11-google-id',
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				profilePicture: 'url_to_picture11',
				birthday: '1998-01-01',
				bio: 'Animal lover and photographer.'
			},
			{
				googleUserId: 'user12-google-id',
				firstName: 'Jane',
				lastName: 'Smith',
				email: 'jane@example.com',
				profilePicture: 'url_to_picture12',
				birthday: '1997-05-20',
				bio: 'Passionate about animal rescue.'
			},
			{
				googleUserId: 'user13-google-id',
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				profilePicture: 'url_to_picture13',
				birthday: '1996-09-15',
				bio: 'Animal enthusiast and photographer.'
			},
			{
				googleUserId: 'user14-google-id',
				firstName: 'Jane',
				lastName: 'Smith',
				email: 'jane@example.com',
				profilePicture: 'url_to_picture14',
				birthday: '1995-11-30',
				bio: 'Pet lover and nature enthusiast.'
			},
			{
				googleUserId: 'user15-google-id',
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				profilePicture: 'url_to_picture15',
				birthday: '1994-03-05',
				bio: 'Animal lover and photographer.'
			}
		]
	});

	const createdUsers = await prisma.user.findMany();

	const animalsData = [
		{
			firstName: 'Rex',
			birthday: '2018-01-01',
			species: 'Dog',
			breed: 'Labrador',
			sex: 'Male',
			bio: 'Friendly and playful.'
		},
		{
			firstName: 'Whiskers',
			birthday: '2019-03-15',
			species: 'Cat',
			breed: 'Siamese',
			sex: 'Female',
			bio: 'Loves to cuddle.'
		},
		{
			firstName: 'Bella',
			birthday: '2020-07-21',
			species: 'Dog',
			breed: 'Beagle',
			sex: 'Female',
			bio: 'Curious and energetic.'
		},
		{
			firstName: 'Charlie',
			birthday: '2017-11-02',
			species: 'Dog',
			breed: 'Golden Retriever',
			sex: 'Male',
			bio: 'Loyal companion.'
		},
		{
			firstName: 'Milo',
			birthday: '2021-02-10',
			species: 'Cat',
			breed: 'Maine Coon',
			sex: 'Male',
			bio: 'Loves to climb.'
		},
		{
			firstName: 'Luna',
			birthday: '2019-09-05',
			species: 'Cat',
			breed: 'Persian',
			sex: 'Female',
			bio: 'Elegant and calm.'
		},
		{
			firstName: 'Rocky',
			birthday: '2016-12-25',
			species: 'Dog',
			breed: 'Boxer',
			sex: 'Male',
			bio: 'Strong and protective.'
		},
		{
			firstName: 'Daisy',
			birthday: '2015-06-30',
			species: 'Dog',
			breed: 'Poodle',
			sex: 'Female',
			bio: 'Intelligent and friendly.'
		},
		{
			firstName: 'Oscar',
			birthday: '2018-08-12',
			species: 'Cat',
			breed: 'Bengal',
			sex: 'Male',
			bio: 'Very playful.'
		},
		{
			firstName: 'Chloe',
			birthday: '2022-01-08',
			species: 'Cat',
			breed: 'Ragdoll',
			sex: 'Female',
			bio: 'Affectionate and social.'
		},
		{
			firstName: 'Max',
			birthday: '2017-04-20',
			species: 'Dog',
			breed: 'German Shepherd',
			sex: 'Male',
			bio: 'Loyal and protective.'
		},
		{
			firstName: 'Simba',
			birthday: '2020-03-03',
			species: 'Cat',
			breed: 'Siberian',
			sex: 'Male',
			bio: 'Loves the snow.'
		},
		{
			firstName: 'Zoe',
			birthday: '2016-07-14',
			species: 'Dog',
			breed: 'Cocker Spaniel',
			sex: 'Female',
			bio: 'Loves to run.'
		},
		{
			firstName: 'Shadow',
			birthday: '2019-05-22',
			species: 'Cat',
			breed: 'British Shorthair',
			sex: 'Male',
			bio: 'Independent and quiet.'
		},
		{
			firstName: 'Maggie',
			birthday: '2021-10-09',
			species: 'Dog',
			breed: 'Dachshund',
			sex: 'Female',
			bio: 'Small but brave.'
		},
		{
			firstName: 'Leo',
			birthday: '2015-09-30',
			species: 'Cat',
			breed: 'Abyssinian',
			sex: 'Male',
			bio: 'Very curious.'
		},
		{
			firstName: 'Coco',
			birthday: '2018-12-15',
			species: 'Dog',
			breed: 'French Bulldog',
			sex: 'Female',
			bio: 'Charming and playful.'
		},
		{
			firstName: 'Toby',
			birthday: '2019-07-01',
			species: 'Dog',
			breed: 'Shih Tzu',
			sex: 'Male',
			bio: 'Loves attention.'
		},
		{
			firstName: 'Nala',
			birthday: '2022-02-18',
			species: 'Cat',
			breed: 'Sphynx',
			sex: 'Female',
			bio: 'Loves warmth.'
		}
	];

	const animals = animalsData.map((animal, index) => ({
		...animal,
		userId: createdUsers[index % createdUsers.length].id
	}));

	await prisma.animal.createMany({ data: animals });
	console.log('Seeding completed!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
