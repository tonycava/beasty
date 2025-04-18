<script lang="ts">
	import { onMount } from 'svelte';
	import { generateUUID } from '$lib/utils/generateUUID';
	import { MatchStatus } from '../../modules/matcher/entities/Match';
	import { user } from '$auth/stores/UserStore';
	import type { Animal } from '../../modules/matcher/entities/Animal';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { trpc } from '$lib/clients/client';
	import confetti from 'canvas-confetti';
	import type { AnimalItem } from '../../modules/profile/entities/Animal.ts';

	let animals: AnimalItem[] = [];
	let selectedAnimal: Animal | null = null;
	let currentAnimalIndex = 0;
	let isAnimating = false;
	let direction = '';
	let matchedAnimalIds: string[] = [];
	let showRedBackground = false;

	onMount(async () => {
		try {
			const data = await trpc().matcherRouter.getMatcher.query($user?.id!);

			selectedAnimal = data.selectedAnimal;

			animals = data.animals;

			const matchedAnimalIds = data.animals.map((match: any) =>
				match.animalInitiatorId === $user?.id ? match.animalMatchedId : match.animalInitiatorId
			);

			animals = animals.filter((animal) => {
				if (selectedAnimal && animal.id === selectedAnimal.id) {
					console.log("Exclu: votre animal principal", animal);
					return false;
				}

				if (animal.userId === $user?.id) {
					console.log("Exclu: animal appartenant à l'utilisateur actuel", animal);
					return false;
				}

				if (matchedAnimalIds.includes(animal.id)) {
					console.log("Exclu: animal déjà matché", animal);
					return false;
				}

				return true;
			});

			console.log("Animaux après filtrage:", animals);

		} catch (error) {
			console.error('Erreur lors de la récupération des animaux:', error);
		}
	});

	async function handleAction(action: MatchStatus.ACCEPTED | MatchStatus.REJECTED) {
		if (isAnimating || !selectedAnimal) return;

		isAnimating = true;
		direction = action === MatchStatus.ACCEPTED ? 'left' : 'right';

		if (action === MatchStatus.ACCEPTED) {
			launchConfetti();
		}

		if (action === MatchStatus.REJECTED) {
			showRedBackground = true;
		}

		setTimeout(() => {
			showRedBackground = false;
		}, 1000);

		const animalMatched = animals[currentAnimalIndex];

		console.log("selectedAnimal", selectedAnimal);

		if (!selectedAnimal?.id || !animalMatched?.id) {
			console.error("🚨 Erreur : ID manquant !");
			return;
		}

		try {
			await trpc().matcherRouter.createMatch.mutate({
				id: generateUUID(),
				animalInitiatorId: selectedAnimal.id,
				animalMatchedId: animalMatched.id,
				status: action
			});

			setTimeout(() => {
				matchedAnimalIds.push(animalMatched.id);
				animals = animals.filter(animal => !matchedAnimalIds.includes(animal.id));

				if (currentAnimalIndex < animals.length - 1) {
					currentAnimalIndex++;
				} else {
					currentAnimalIndex = 0;
				}

				isAnimating = false;
			}, 700);
		} catch (error) {
			console.error('Erreur lors de la création du match', error);
			isAnimating = false;
		}
	}

	function getCardStyle(index: number, totalCards: number) {
		if (totalCards === 1 && index === 0) {
			return '';
		}
		if (index === 0) {
			return 'transform: rotate(0deg);';
		}

		const translateY = (index - (totalCards - 1)) * 20;
		const rotation = index % 2 === 0 ? 10 : -10;

		return `transform: translateY(${translateY}px) rotate(${rotation}deg);`;
	}

	function launchConfetti() {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 }
		});
	}
</script>

<div class="flex flex-col min-h-screen bg-gradient">
	<div class="fixed top-0 left-0 right-0 z-50">
		<Navbar />
		<div class="h-32 bg-white"></div>
	</div>
	{#if showRedBackground}
		<div class="overlay"></div>
	{/if}
	<div class="flex h-screen w-screen items-center justify-center mt-32">
		<div class="relative h-[550px] w-[950px]">
			{#if animals.length === 0}
				<div class="flex h-full items-center justify-center">
					<p class="text-xl">Aucun animal disponible</p>
				</div>
			{:else}
				{#each animals.slice(currentAnimalIndex, currentAnimalIndex + Math.min(4, animals.length - currentAnimalIndex)) as animal, index (animal.id)}
					<div
						class="card absolute w-[850px] h-[450px] rounded-[10px] border-2 border-gray-400 bg-[#fff0c8] p-[20px]
            {index === 0 ? 'top-card z-[10]' : ''}
            {isAnimating && index === 0
							? direction === 'left'
								? 'animate-left'
								: 'animate-right'
							: ''}"
						style={getCardStyle(index, Math.min(4, animals.length - currentAnimalIndex))}
					>
						{#if index === 0}
							<div
								class="info flex flex-col items-center justify-start w-[336px] h-[400px] bg-[#3b7080] rounded-[10px] p-[20px]"
							>
								<img class="image w-[275px] h-[275px] bg-gray-500 mb-[10px]"
										 src={animal.images[0].url || 'https://via.placeholder.com/275'}
										 alt={animal.firstName}/>
								<div class="details text-white font-poppins text-[30px] text-center">
									<div class="name">{animal.firstName}</div>
									<div>{animal.birthday}</div>
								</div>
							</div>

							<div
								class="description absolute left-[400px] top-[25px] w-[50%] bg-[#f5f5f5] rounded-[10px] p-[20px] shadow-lg"
							>
								<div class="title font-bold text-[#ff9f63] text-[17px]">Description :</div>
								<div class="text mt-[10px] text-[15px]">{animal.bio}</div>
								<div class="divider w-full h-[2px] bg-black my-[10px]"></div>
								<ul class="list mt-[10px] text-[20px]">
									<li class="flex justify-between mb-[5px]">
										<span class="font-bold text-[#ff9f63]">Anniversaire :</span>
										{animal.birthday || 'Non défini'}
									</li>
									<li class="flex justify-between mb-[5px]">
										<span class="font-bold text-[#ff9f63]">Espèce :</span>
										{animal.species || 'Non défini'}
									</li>
									<li class="flex justify-between mb-[5px]">
										<span class="font-bold text-[#ff9f63]">Race :</span>
										{animal.breed || 'Non défini'}
									</li>
									<li class="flex justify-between mb-[5px]">
										<span class="font-bold text-[#ff9f63]">Sexe :</span>
										{animal.sex || 'Non défini'}
									</li>
								</ul>
							</div>

							<div class="buttons absolute bottom-[10px] right-[10px] flex gap-[10px]">
								<button
									on:click={() => handleAction(MatchStatus.ACCEPTED)}
									class="flex h-[65px] w-[72px] items-center justify-center rounded-[20px] bg-[#3B7080]"
									aria-label="Match"
								>
									<div
										class="flex h-[50px] w-[50px] items-center justify-center bg-green-300"
									></div>
								</button>
								<button
									on:click={() => handleAction(MatchStatus.REJECTED)}
									class="flex h-[65px] w-[72px] items-center justify-center rounded-[20px] bg-[#FF9F63]"
									aria-label="Reject"
								>
									<div class="flex h-[50px] w-[50px] items-center justify-center bg-red-300"></div>
								</button>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<Footer />
</div>

<style>
    .card {
        transition:
                transform 0.5s ease-in-out,
                background-color 0.5s ease-in-out;
    }

    .left {
        transform: translateX(-1000px) rotate(-20deg);
        opacity: 0;
    }

    .right {
        transform: translateX(1000px) rotate(20deg);
        opacity: 0;
    }

    .bg-gradient {
        background:
                radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 70%),
                radial-gradient(circle at 80% 10%, rgba(200, 200, 200, 0.5) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(220, 220, 220, 0.6) 0%, transparent 60%),
                radial-gradient(circle at 70% 50%, rgba(240, 240, 240, 0.7) 0%, transparent 40%),
                linear-gradient(45deg, rgba(245, 245, 245, 0.4), rgba(230, 230, 230, 0.5));
        background-size: 200% 200%;
        animation: moveGradient 20s ease infinite;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 0, 0, 0.4); /* Rouge avec opacité */
        z-index: 5;
        animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes moveGradient {
        0% {
            background-position: 0% 0%;
        }
        25% {
            background-position: 100% 0%;
        }
        50% {
            background-position: 100% 100%;
        }
        75% {
            background-position: 0% 100%;
        }
        100% {
            background-position: 0% 0%;
        }
    }

    @keyframes moveLeft {
        0% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateX(-1200px) rotate(-45deg);
            opacity: 0;
        }
    }

    @keyframes moveRight {
        0% {
            transform: translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateX(1200px) rotate(45deg);
            opacity: 0;
        }
    }

    .animate-left {
        animation: moveLeft 0.7s ease-in-out forwards;
    }

    .animate-right {
        animation: moveRight 0.7s ease-in-out forwards;
    }
</style>