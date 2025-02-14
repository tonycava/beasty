<script lang="ts">
	import { onMount } from 'svelte';
	import { getMatcher, createMatch } from '$lib/api/matcher';
	import { generateUUID } from '$lib/utils/generateUUID';
	import { user } from '$auth/stores/UserStore';
	import type { Animal } from '../../modules/matcher/entities/Animal';
	import { trpc } from '$lib/clients/client';

	let animals: Animal[] = [];
	let selectedAnimal: Animal | null = null;
	let currentAnimalIndex = 0;
	let isAnimating = false;
	let direction = '';

	// Récupération des données au chargement de la page
	onMount(async () => {
		try {
			const data = await trpc().matcherRouter.getMatcher.query($user?.id!);
			animals = data.animals;
			selectedAnimal = data.selectedAnimal;
		} catch (error) {
			console.error('Erreur lors de la récupération des animaux', error);
		}
	});

	// Fonction pour gérer les actions "match" et "reject"
	async function handleAction(action: 'accepted' | 'rejected') {
		if (isAnimating || !selectedAnimal || !animals[currentAnimalIndex]) return;

		isAnimating = true;
		direction = action === 'accepted' ? 'right' : 'left';

		const animalMatched = animals[currentAnimalIndex];

		try {
			await trpc().matcherRouter.createMatch.mutate({
				id: generateUUID(),
				animalInitiator: { id: selectedAnimal.id },
				animalMatched: { id: animalMatched.id },
				status: action
			});
			console.log('Match créé avec succès');
		} catch (error) {
			console.error('Erreur lors de la création du match', error);
		}

		// Animation puis passage à l'animal suivant
		setTimeout(() => {
			currentAnimalIndex++;
			isAnimating = false;
		}, 500);
	}
</script>

<!-- Carte principale -->
<div class="flex h-screen w-screen items-center justify-center">
	<div class="relative h-[550px] w-[950px] rounded-[10px] border border-black bg-[#FFF0C8] p-5">
		{#if animals[currentAnimalIndex]}
			<div
				class="card-anim {direction === 'left'
					? 'left'
					: direction === 'right'
						? 'right'
						: ''} relative h-[450px] w-[850px] rounded-[10px] border border-gray bg-[#FFF0C8] p-5"
				class:left={isAnimating && direction === 'left'}
				class:right={isAnimating && direction === 'right'}
				style="left: 25px; top: 25px;"
			>
				<!-- Section cadre -->
				<div
					class="flex h-[400px] w-[336px] flex-col items-center justify-start rounded-[10px] bg-[#3B7080] p-6"
				>
					<div class="mb-2 h-[275px] w-[275px] bg-gray-300"></div>
					<div class="my-4 h-[2px] w-full bg-white"></div>
					<div
						class="flex justify-center text-white"
						style="font-family: 'Poppins', sans-serif; font-size: 30px;"
					>
						<div class="mr-2">{animals[currentAnimalIndex]?.firstName}</div>
						<div>{animals[currentAnimalIndex]?.birthday}</div>
					</div>
				</div>

				<!-- Section description -->
				<div
					class="description-container absolute flex flex-col justify-start p-6 border border-gray-400 rounded-[10px] shadow-lg animate-fade-in"
					style="left: 400px; top: 25px; background-color: #f5f5f5; width: 50%;"
				>
					<div
						class="font-semibold text-[#FF9F63]"
						style="font-family: 'Poppins', sans-serif; font-size: 17px;"
					>
						Description :
					</div>
					<div class="mt-4 text-black" style="font-family: 'Poppins', sans-serif; font-size: 15px;">
						{animals[currentAnimalIndex]?.bio}
					</div>
					<div class="mx-auto my-8 h-[1px] w-3/4 bg-black"></div>
					<ul class="text-black" style="font-family: 'Poppins', sans-serif; font-size: 20px;">
						<li class="grid grid-cols-2">
							<span class="font-semibold text-[#FF9F63]">Anniversaire :</span>
							<span>{animals[currentAnimalIndex]?.birthday || 'Non défini'}</span>
						</li>
						<li class="grid grid-cols-2">
							<span class="font-semibold text-[#FF9F63]">Espèce :</span>
							<span>{animals[currentAnimalIndex]?.species || 'Non défini'}</span>
						</li>
						<li class="grid grid-cols-2">
							<span class="font-semibold text-[#FF9F63]">Race :</span>
							<span>{animals[currentAnimalIndex]?.breed || 'Non défini'}</span>
						</li>
						<li class="grid grid-cols-2">
							<span class="font-semibold text-[#FF9F63]">Sexe :</span>
							<span>{animals[currentAnimalIndex]?.sex || 'Non défini'}</span>
						</li>
					</ul>
				</div>

				<!-- Section boutons sous description-->
				<div class="absolute bottom-6 right-6 flex gap-5">
					<button
						on:click={() => handleAction('accepted')}
						class="flex h-[65px] w-[72px] items-center justify-center rounded-[20px] bg-[#3B7080]"
						aria-label="Match"
					>
						<div class="flex h-[50px] w-[50px] items-center justify-center bg-green-300"></div>
					</button>
					<button
						on:click={() => handleAction('rejected')}
						class="flex h-[65px] w-[72px] items-center justify-center rounded-[20px] bg-[#FF9F63]"
						aria-label="Reject"
					>
						<div class="flex h-[50px] w-[50px] items-center justify-center bg-red-300"></div>
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.card-anim {
		transition:
			transform 0.5s,
			opacity 0.5s;
		position: absolute;
	}
	.card-anim.left {
		transform: translateX(-1000px) rotate(-45deg);
		opacity: 0;
	}
	.card-anim.right {
		transform: translateX(1000px) rotate(45deg);
		opacity: 0;
	}
	.description-container {
		transition: all 0.3s ease-in-out;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	.animate-fade-in {
		animation: fade-in 0.3s ease-in-out;
	}
</style>
