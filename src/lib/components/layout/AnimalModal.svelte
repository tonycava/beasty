<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import { user } from '$auth/stores/UserStore';
	import { filesProxy, type Infer, superForm, type SuperValidated } from 'sveltekit-superforms/client';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import InputField from '$lib/components/layout/InputField.svelte';
	import { animalDto } from '../../../modules/profile/dto/AnimalDto';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { isOpen = $bindable(), canClose = true, data }  : { 	isOpen?: boolean, canClose: boolean, data : SuperValidated<Infer<typeof animalDto>> } = $props<object>();

	const dispatch = createEventDispatcher();

	let photoUrl = $state("");
	let photosSupplementaires = $state<string[]>([]);
	let photoFile = $state<File | null>(null);
	let photoSupplementairesFiles = $state<File[]>([]);

	const { form, errors, constraints } = superForm(data, {
		validators: zodClient(animalDto)
	})

	const files = filesProxy(form, "images");

	const sexes = ["Mâle", "Femelle"];

	function handleClose() {
		resetAndClose();
		dispatch('close');
	}

	function resetAndClose() {
		$form = {
			id: crypto.randomUUID(),
			firstName: "",
			birthday: "",
			species: "",
			breed: "",
			weight: 0,
			sex: "Femelle",
			bio: "",
			userId: $user?.id || "",
			images: []
		};

		photoUrl = "";
		photosSupplementaires = [];
		photoFile = null;
		photoSupplementairesFiles = [];

		isOpen = false;
	}

	function isValidImageFile(file: File): boolean {
		if (!file.type.startsWith('image/')) {
		//	$errors.images = ['Seules les images sont acceptées (JPG, PNG, GIF, etc.)'];
			return false;
		}

		const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSizeInBytes) {
		//	$errors.images = ['L\'image est trop volumineuse (maximum 5MB)'];
			return false;
		}

		return true;
	}

	function handlePhotoChange() {
		if (browser) {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.onchange = (e: Event) => {
				const target = e.target as HTMLInputElement;
				if (target.files && target.files[0]) {
					const file = target.files[0];

					if (!isValidImageFile(file)) {
						return;
					}

					photoFile = file;

					$files = [file];
					
					const reader = new FileReader();
					reader.onload = (e) => {
						if (e.target && e.target.result) {
							photoUrl = e.target.result as string;
						}
					};
					reader.readAsDataURL(file);
				}
			};
			input.click();
		}
	}

	function handleAddSupplementaryPhoto() {
		if (browser) {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.onchange = (e: Event) => {
				const target = e.target as HTMLInputElement;
				if (target.files && target.files[0]) {
					const file = target.files[0];

					if (!isValidImageFile(file)) {
						return;
					}

					photoSupplementairesFiles = [...photoSupplementairesFiles, file];

					const reader = new FileReader();
					reader.onload = (e) => {
						if (e.target && e.target.result) {
							photosSupplementaires = [...photosSupplementaires, e.target.result as string];
						}
					};
					reader.readAsDataURL(file);
				}
			};
			input.click();
		}
	}

	function removeMainPhoto() {
		photoUrl = "";
		photoFile = null;
		$files = photoSupplementairesFiles;
	}

	function removeSupplementaryPhoto(index: number) {
		photosSupplementaires = photosSupplementaires.filter((_, i) => i !== index);
		photoSupplementairesFiles = photoSupplementairesFiles.filter((_, i) => i !== index);

		$files = photoFile ? [photoFile, ...photoSupplementairesFiles.filter((_, i) => i !== index)] :
			[...photoSupplementairesFiles.filter((_, i) => i !== index)];
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
		<div class="bg-white w-11/12 max-w-5xl rounded-lg shadow-lg overflow-auto max-h-[90vh]">
			<div class="p-6">
				<div class="flex justify-end mb-4">
					{#if canClose}
						<button class="text-2xl text-gray-500 hover:text-gray-700" onclick={handleClose}>
							×
						</button>
					{/if}
				</div>

				<form method="POST" enctype="multipart/form-data">
					<div class="flex flex-col md:flex-row gap-8">
						<div class="md:w-1/3 flex flex-col">
							<input
								type="file"
								id="images"
								name="images"
								bind:files={$files}
								{...$constraints.images}
								multiple
								class="hidden"
							/>

							<div class="mb-6">
								<h3 class="text-orange-400 text-sm font-normal mb-3">Photo principale</h3>
								{#if photoUrl}
									<div class="w-full h-40 border border-gray-200 rounded overflow-hidden relative group mb-3">
										<img src={photoUrl} alt="Photo principale" class="w-full h-full object-contain" />
										<button
											type="button"
											class="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
											onclick={removeMainPhoto}
										>
											×
										</button>
									</div>
								{:else}
									<button
										type="button"
										class="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 mb-3 bg-gray-50"
										onclick={handlePhotoChange}
									>
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-gray-400 mb-2">
											<rect x="3" y="3" width="18" height="18" rx="2" />
											<circle cx="8.5" cy="8.5" r="1.5" />
											<path d="M21 15l-5-5L5 21" />
										</svg>
										<span class="text-gray-500">Cliquez pour ajouter une photo</span>
									</button>
								{/if}
								{#if $errors.images}
									<p class="text-red-500 mt-1 text-sm">{$errors.images}</p>
								{/if}
							</div>

							<div class="mb-6">
								<h3 class="text-orange-400 text-sm font-normal mb-3">Photos supplémentaires</h3>
								<div class="flex flex-wrap gap-3">
									<button
										type="button"
										class="w-20 h-20 border border-gray-200 rounded flex justify-center items-center cursor-pointer hover:bg-gray-50"
										onclick={handleAddSupplementaryPhoto}
										aria-label="Ajouter des images supplémentaires"
									>
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-gray-300">
											<rect x="3" y="3" width="18" height="18" rx="2" />
											<path d="M12 8v8M8 12h8" />
										</svg>
									</button>

									{#each photosSupplementaires as photo, index}
										<div class="w-20 h-20 border border-gray-200 rounded overflow-hidden relative group">
											<img src={photo} alt={`Photo supplémentaire ${index + 1}`} class="w-full h-full object-contain" />
											<button
												type="button"
												class="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
												onclick={() => removeSupplementaryPhoto(index)}
											>
												×
											</button>
										</div>
									{/each}
								</div>
								{#if $errors.images}
									<p class="text-red-500 mt-1 text-sm">{$errors.images}</p>
								{/if}
							</div>
						</div>

						<!-- Form Section -->
						<div class="md:w-2/3">
							<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
								<div>
									<InputField
										title="Nom"
										type="text"
										name="firstName"
										bind:value={$form.firstName}
										placeholder="Luna"
										required
										{...$constraints.firstName}
									/>
									{#if $errors.firstName}
										<p class="text-red-500 mt-1 text-sm">{$errors.firstName}</p>
									{/if}
								</div>

								<div class="mt-2">
									<label for="sex" class="block text-orange-400 mb-1">Sexe</label>
									<select
										id="sex"
										title="Sexe"
										name="sex"
										bind:value={$form.sex}
										class="font-space-mono w-full text-accent-dark px-3 py-2 border-2 border-gray-200 border-lightless rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
										required
										{...$constraints.sex}
									>
										{#each sexes as sexe}
											<option value={sexe}>{sexe}</option>
										{/each}
									</select>
									{#if $errors.sex}
										<p class="text-red-500 mt-1 text-sm">{$errors.sex[0]}</p>
									{/if}
								</div>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
								<div>
									<InputField
										title="Espèce"
										type="text"
										name="species"
										bind:value={$form.species}
										placeholder="Chien"
										required
										class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
										{...$constraints.species}
									/>
									{#if $errors.species}
										<p class="text-red-500 mt-1 text-sm">{$errors.species}</p>
									{/if}
								</div>

								<div class="mt-2">
									<label for="birthday" class="block text-orange-400 mb-1">Date de naissance</label>
									<input
										type="date"
										id="birthday"
										name="birthday"
										bind:value={$form.birthday}
										placeholder="jj/mm/aaaa"
										class="font-space-mono w-full px-3 py-2 border-2 text-accent-dark border-gray-200 rounded border-lightless focus:outline-none focus:ring-1 focus:ring-orange-400"
										required
										{...$constraints.birthday}
									/>
									{#if $errors.birthday}
										<p class="text-red-500 mt-1 text-sm">{$errors.birthday[0]}</p>
									{/if}
								</div>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
								<div>
									<InputField
										title="Race"
										type="text"
										name="breed"
										bind:value={$form.breed}
										required
										placeholder="Carlin"
										class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
										{...$constraints.breed}
									/>
									{#if $errors.breed}
										<p class="text-red-500 mt-1 text-sm">{$errors.breed}</p>
									{/if}
								</div>

								<div class="mt-3">
									<label for="weight" class="text-secondary font-poppins-regular mt-2"> Poids (en kg)</label>
									<input
										type="number"
										id="weight"
										name="weight"
										bind:value={$form.weight}
										placeholder="20"
										required
										aria-invalid={$errors.weight ? 'true' : undefined}
										class="font-space-mono bg-bg-dark text-accent-dark p-2 border-2 border-lightless rounded focus-visible:outline-none focus-visible:border-primary-medium w-full px-3 py-2 border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-400"
										{...$constraints.weight}
									/>
									{#if $errors.weight}
										<p class="text-red-500 mt-1 text-sm">{$errors.weight}</p>
									{/if}
								</div>
							</div>

							<div>
								<label for="bio" class="text-secondary font-poppins-regular mb-4">Biographie</label>
								<textarea
									id="bio"
									name="bio"
									bind:value={$form.bio}
									rows="4"
									required
									placeholder="C'est une chienne"
									aria-invalid={$errors.bio ? 'true' : undefined}
									class="font-space-mono bg-bg-dark text-accent-dark p-2 border-2 border-lightless rounded w-full focus-visible:outline-none focus-visible:border-primary-medium px-3 py-2 border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-400 resize-y"
									{...$constraints.bio}
								></textarea>
								{#if $errors.bio}
									<p class="text-red-500 mt-1 text-sm">{$errors.bio}</p>
								{/if}
							</div>

							<input type="hidden" id="userId" name="userId" value={$user?.id} {...$constraints.userId} />
							<input type="hidden" id="id" name="id" value={crypto.randomUUID()} {...$constraints.id} />
						</div>
					</div>

					<div class="flex justify-end pt-6 mt-6 border-t border-gray-100">
						<PrimaryButton type="submit" class="px-6 py-2 bg-orange-400 text-white hover:bg-orange-500 font-medium ml-4">
							Enregistrer
						</PrimaryButton>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}