<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	// Définition des propriétés du modal
	let { isOpen = $bindable(), canClose = true } = $props<{
		isOpen?: boolean;
		canClose: boolean;
	}>();

	// Types pour le formulaire
	type Animal = {
		nom: string;
		sexe: string;
		espece: string;
		race: string;
		dateDeNaissance: string;
		poids: string;
		biographie: string;
		photoUrl: string;
		photosSupplementaires: string[];
	};

	// Dispatch pour les événements
	const dispatch = createEventDispatcher<{
		close: void;
		save: Animal;
	}>();

	// État initial de l'animal
	let animal: Animal = $state({
		nom: '',
		sexe: 'Femelle',
		espece: '',
		race: '',
		dateDeNaissance: '',
		poids: '',
		biographie: '',
		photoUrl: '', // URL par défaut
		photosSupplementaires: []
	});

	// Liste des sexes pour le dropdown
	const sexes = ['Mâle', 'Femelle'];

	// Gestion de la fermeture du modal
	const handleClose = () => {
		dispatch('close');
		isOpen = false;
	};

	// Gestion de la sauvegarde du formulaire
	const handleSave = () => {
		dispatch('save', animal);
		isOpen = false;
	};

	// Gestion du changement de photo principale
	const handlePhotoChange = () => {
		// En situation réelle, ceci ouvrirait un sélecteur de fichier
		// et mettrait à jour l'URL de la photo
		if (browser) {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.onchange = (e: Event) => {
				const target = e.target as HTMLInputElement;
				if (target.files && target.files[0]) {
					const reader = new FileReader();
					reader.onload = (e) => {
						if (e.target && e.target.result) {
							animal.photoUrl = e.target.result as string;
						}
					};
					reader.readAsDataURL(target.files[0]);
				}
			};
			input.click();
		}
	};

	// Gestion de l'ajout de photos supplémentaires
	const handleAddSupplementaryPhoto = () => {
		if (browser) {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.onchange = (e: Event) => {
				const target = e.target as HTMLInputElement;
				if (target.files && target.files[0]) {
					const reader = new FileReader();
					reader.onload = (e) => {
						if (e.target && e.target.result) {
							animal.photosSupplementaires = [...animal.photosSupplementaires, e.target.result as string];
						}
					};
					reader.readAsDataURL(target.files[0]);
				}
			};
			input.click();
		}
	};
</script>

{#if isOpen}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
		<div class="bg-white w-11/12 max-w-5xl rounded-lg shadow-lg overflow-auto max-h-[90vh]">
			<div class="p-6">
				<!-- Header -->
				<div class="flex justify-end mb-4">
					{#if canClose}
						<button class="text-2xl text-gray-500 hover:text-gray-700" onclick={handleClose}>
							×
						</button>
					{/if}
				</div>


				<!-- Body -->
				<div class="flex flex-col md:flex-row gap-8">
					<!-- Photo Section -->
					<div class="md:w-1/3 flex flex-col">
						<div class="w-full h-80 bg-gray-100 rounded-lg overflow-hidden mb-4 flex justify-center items-center">
							{#if animal.photoUrl}
								<img src={animal.photoUrl} alt="Photo de l'animal" class="w-full h-full object-cover" />
							{:else}
								<div class="w-20 h-20 text-gray-300">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full">
										<path
											d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14h-4v-4h4v4zm0-6h-4V7h4v4z" />
									</svg>
								</div>
							{/if}
						</div>

						<button
							class="w-full py-2 text-orange-400 hover:text-orange-500 font-medium text-center mb-8"
							onclick={handlePhotoChange}
						>
							Changer la photo...
						</button>

						<div class="mb-6">
							<h3 class="text-orange-400 text-sm font-normal mb-3">Photos supplémentaires</h3>
							<div class="flex flex-wrap gap-3">
								<div
									class="w-20 h-20 border border-gray-200 rounded flex justify-center items-center cursor-pointer hover:bg-gray-50"
									onclick={handleAddSupplementaryPhoto}
								>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
											 class="w-6 h-6 text-gray-300">
										<rect x="3" y="3" width="18" height="18" rx="2" />
										<path d="M12 8v8M8 12h8" />
									</svg>
								</div>

								{#each animal.photosSupplementaires as photo}
									<div class="w-20 h-20 border border-gray-200 rounded overflow-hidden">
										<img src={photo} alt="Photo supplémentaire" class="w-full h-full object-cover" />
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Form Section -->
					<div class="md:w-2/3">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
							<div>
								<label for="nom" class="block text-orange-400 text-sm mb-1">Nom</label>
								<input
									type="text"
									id="nom"
									bind:value={animal.nom}
									required
									placeholder="Anthony"
									class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
								/>
							</div>

							<div>
								<label for="sexe" class="block text-orange-400 text-sm mb-1">Sexe</label>
								<select
									id="sexe"
									required
									bind:value={animal.sexe}
									class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none"
								>
									{#each sexes as sexe}
										<option value={sexe}>{sexe}</option>
									{/each}
								</select>
							</div>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
							<div>
								<label for="espece" class="block text-orange-400 text-sm mb-1">Espèce</label>
								<input
									type="text"
									id="espece"
									required
									bind:value={animal.espece}
									placeholder="Chien"
									class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
								/>
							</div>

							<div>
								<label for="date-naissance" class="block text-orange-400 text-sm mb-1">Date de naissance</label>
								<input
									type="date"
									id="date-naissance"
									required
									bind:value={animal.dateDeNaissance}
									placeholder="jj/mm/aaaa"
									class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
								/>
							</div>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
							<div>
								<label for="race" class="block text-orange-400 text-sm mb-1">Race</label>
								<input
									type="text"
									id="race"
									required
									bind:value={animal.race}
									placeholder="Carlin"
									class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
								/>
							</div>

							<div>
								<label for="poids" class="block text-orange-400 text-sm mb-1">Poids (kg)</label>
								<input
									type="text"
									id="poids"
									required
									bind:value={animal.poids}
									placeholder="20"
									class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
								/>
							</div>
						</div>

						<div class="mb-5">
							<label for="biographie" class="block text-orange-400 text-sm mb-1">Biographie</label>
							<textarea
								id="biographie"
								bind:value={animal.biographie}
								rows="4"
								required
								placeholder="C'est une chienne"
								class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 resize-y"
							></textarea>
						</div>
					</div>
				</div>

				<!-- Footer -->
				<div class="flex justify-end pt-6 mt-6 border-t border-gray-100">
					<button
						class="px-6 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors"
						onclick={handleSave}
					>
						Ajouter
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
