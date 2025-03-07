<script lang="ts">
	import { onMount } from 'svelte';
	import { trpc } from '$lib/clients/client';
	import { user } from '$auth/stores/UserStore';
	import { get } from 'svelte/store';
	import type { Match } from '../../modules/matcher/entities/Match';

	let matches: Match[] = [];
	let animals: { id: string; firstName: string }[] = [];
	let selectedAnimalId: string | null = null;

	// Récupération des animaux de l'utilisateur connecté
	onMount(async () => {
		const $user = get(user);

		if (!$user?.id) {
			console.error("❌ Aucun utilisateur trouvé !");
			return;
		}

		try {
			animals = await trpc().matcherRouter.getAnimalsByUser.query($user.id);

			if (animals.length > 0) {
				selectedAnimalId = animals[0].id; // Sélectionne le premier animal par défaut
				await fetchMatches(); // Charge les matchs immédiatement
			}
		} catch (error) {
			console.error("❌ Erreur lors de la récupération des animaux:", error);
		}
	});

	// Fonction pour récupérer les matchs de l'animal sélectionné
	async function fetchMatches() {
		if (!selectedAnimalId) {
			console.warn("⚠️ Aucun animal sélectionné !");
			matches = [];
			return;
		}

		try {
			const data = await trpc().matcherRouter.getMyMatches.query(selectedAnimalId);

			if (!data || data.length === 0) {
				console.warn("⚠️ Aucune donnée récupérée depuis TRPC !");
			} 
			matches = data;
		} catch (error) {
			console.error("❌ Erreur lors de la récupération des matchs:", error);
		}
	}
</script>

<style>
	.match-card {
		background-color: #f9f9f9;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 16px;
		margin-top: 16px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.match-card h1 {
		color: #333;
	}

	.animal-select {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 8px;
		width: 100%;
	}

	.no-matches {
		color: #ff4d4d;
		font-weight: bold;
	}
</style>

<!-- Sélecteur d'animal -->
<div class="mb-4">
	<label for="animal-select" class="block text-lg font-bold">Sélectionnez un animal :</label>
	<select id="animal-select" bind:value={selectedAnimalId} on:change={fetchMatches} class="animal-select">
		{#each animals as animal}
			<option value={animal.id}>{animal.firstName}</option>
		{/each}
	</select>
</div>

<!-- Liste des matchs -->
{#if matches.length > 0}
	<div class="match-card">
		<h1>Mes matchs : </h1>
		{#each matches as match}
			<p>- {match?.animalMatched?.firstName}</p>
		{/each}
	</div>
{:else}
	<div class="flex h-full items-center justify-center">
		<p class="text-xl no-matches">Aucun match disponible</p>
	</div>
{/if}
