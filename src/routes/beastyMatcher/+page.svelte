<script lang="ts">
	import { onMount } from 'svelte';
	import { getMatcher, createMatch } from '$lib/api/matcher';
	import { generateUUID } from '$lib/utils/generateUUID';
	import { user } from '$auth/stores/UserStore';
	import type { Animal } from '../../modules/matcher/entities/Animal';
	import { trpc } from '$lib/clients/client';
	import { array } from 'zod';

	let animals: Animal[] = [];
	let selectedAnimal: Animal | null = null;
	let currentAnimalIndex = 0;
	let isAnimating = false;
	let direction = '';

	// Récupération des données au chargement de la page
	onMount(async () => {
		try {
			const data = await trpc().matcherRouter.getMatcher.query($user?.id!);
			console.log('Données récupérées avec succès', {
				nombreAnimaux: data.animals.length,
				animaux: data.animals,
				selectedAnimal: data.selectedAnimal
			});
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

	// Générer un style unique pour chaque carte en arrière-plan
	function getCardStyle(index: number, totalCards: number) {
		// Si c'est la dernière carte disponible
		if (totalCards === 1 && index === 0) {
			return ''; // Pas de rotation ni de décalage
		}

		// Si c'est la carte du haut
		if (index === totalCards - 1) {
			return '';
		}

		const rotation = (index - (totalCards - 1)) * 5;
		const translateY = (index - (totalCards - 1)) * 10;
		const scale = 1 - (index - (totalCards - 1)) * 0.05;

		return `transform: rotate(${rotation}deg) translateY(${translateY}px) scale(${scale});`;
	}
</script>

<!-- Conteneur principal -->
<div class="flex h-screen w-screen items-center justify-center">
	<div class="relative h-[550px] w-[950px] rounded-[10px] border border-black bg-[#FFF0C8] p-5">
		{#if animals.length === 0}
			<div class="flex h-full items-center justify-center">
				<p class="text-xl">Aucun animal disponible</p>
			</div>
		{:else}
		{#each animals
			.slice(currentAnimalIndex, currentAnimalIndex + Math.min(3, animals.length - currentAnimalIndex))
			as animal, index (animal.id)}
			<div
				class="card {index === 0 ? 'top-card' : ''}"
				class:left={isAnimating && direction === 'left' && index === 0}
				class:right={isAnimating && direction === 'right' && index === 0}
				style={getCardStyle(index, Math.min(3, animals.length - currentAnimalIndex))}
			>
				{#if index === 0}
						<div class="info">
							<div class="image"></div>
							<div class="divider"></div>
							<div class="details">
								<div class="name">{animal.firstName}</div>
								<div>{animal.birthday}</div>
							</div>
						</div>

						<!-- Description -->
						<div class="description">
							<div class="title">Description :</div>
							<div class="text">{animal.bio}</div>
							<div class="divider"></div>
							<ul class="list">
								<li><span>Anniversaire :</span> {animal.birthday || 'Non défini'}</li>
								<li><span>Espèce :</span> {animal.species || 'Non défini'}</li>
								<li><span>Race :</span> {animal.breed || 'Non défini'}</li>
								<li><span>Sexe :</span> {animal.sex || 'Non défini'}</li>
							</ul>
						</div>

						<!-- Boutons de validation -->
						<div class="buttons">
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
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.card {
		position: absolute;
		width: 850px;
		height: 450px;
		border-radius: 10px;
		border: 2px solid gray;
		background-color: #fff0c8;
		padding: 20px;
		transition:
			transform 0.5s,
			opacity 0.5s;
	}

	/* 🎭 Animation de départ */
	.card.left {
		transform: translateX(-1000px) rotate(-45deg);
		opacity: 0;
	}

	.card.right {
		transform: translateX(1000px) rotate(45deg);
		opacity: 0;
	}

	/* ✅ Carte principale */
	.top-card {
		z-index: 10;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		width: 336px;
		height: 400px;
		background-color: #3b7080;
		border-radius: 10px;
		padding: 20px;
	}

	.image {
		width: 275px;
		height: 275px;
		background-color: gray;
		margin-bottom: 10px;
	}

	.divider {
		width: 100%;
		height: 2px;
		background-color: white;
		margin: 10px 0;
	}

	.details {
		color: white;
		font-family: 'Poppins', sans-serif;
		font-size: 30px;
		text-align: center;
	}

	.description {
		position: absolute;
		left: 400px;
		top: 25px;
		width: 50%;
		background-color: #f5f5f5;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.title {
		font-weight: bold;
		color: #ff9f63;
		font-size: 17px;
	}

	.text {
		margin-top: 10px;
		font-size: 15px;
	}

	.list {
		margin-top: 10px;
		font-size: 20px;
	}

	.list li {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}

	.list span {
		font-weight: bold;
		color: #ff9f63;
	}

	.buttons {
		position: absolute;
		bottom: 10px;
		right: 10px;
		display: flex;
		gap: 10px;
	}
</style>
