<script lang="ts">
	import { onMount } from 'svelte';
	import type { Animal } from '../../modules/matcher/entities/Animal';
	import { user } from '$auth/stores/UserStore';
	import { trpc } from '$lib/clients/client';
	import { page } from '$app/stores';

	let animals: Animal[] = [];
	let currentAnimalIndex = 0;
	let isAnimating = false;
	let direction = '';

	// Récupération des animaux
	onMount(async () => {
		animals = await trpc($page).matcherRouter.getMatcher.query($user?.id!);
	});

	// Gestion des actions (match/reject)
	function handleAction(action: 'match' | 'reject') {
		if (isAnimating) return;
		isAnimating = true;
		direction = action === 'match' ? 'right' : 'left';

		// Une fois l'animation terminée, passer au suivant
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
						<div class="mr-2">{animals[currentAnimalIndex]?.name}</div>
						<div>{animals[currentAnimalIndex]?.name}</div>
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
						{animals[currentAnimalIndex]?.name}
					</div>
					<div class="mx-auto my-8 h-[1px] w-3/4 bg-black"></div>
					<ul class="text-black" style="font-family: 'Poppins', sans-serif; font-size: 20px;">
						<li class="grid grid-cols-2">
							<span class="font-semibold text-[#FF9F63]">Anniversaire :</span>
							<span>{animals[currentAnimalIndex]?.name || 'Non défini'}</span>
						</li>
						<li class="grid grid-cols-2">
							<span class="font-semibold text-[#FF9F63]">Espèce :</span>
							<span>{animals[currentAnimalIndex]?.name || 'Non défini'}</span>
						</li>
						<li class="grid grid-cols-2">
							<span class="font-semibold text-[#FF9F63]">Race :</span>
							<span>{animals[currentAnimalIndex]?.name || 'Non défini'}</span>
						</li>
						<li class="grid grid-cols-2">
							<span class="font-semibold text-[#FF9F63]">Sexe :</span>
							<span>{animals[currentAnimalIndex]?.name || 'Non défini'}</span>
						</li>
					</ul>
				</div>

				<!-- Section boutons sous description-->
				<div class="absolute bottom-6 right-6 flex gap-5">
					<button
						on:click={() => handleAction('match')}
						class="flex h-[65px] w-[72px] items-center justify-center rounded-[20px] bg-[#3B7080]"
						aria-label="Match"
					>
						<div class="flex h-[50px] w-[50px] items-center justify-center bg-green-300"></div>
					</button>
					<button
						on:click={() => handleAction('reject')}
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