<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from "$app/forms";
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { user } from '$auth/stores/UserStore';
	import { trpc } from '$lib/clients/client';
	import { onMount } from 'svelte';
	import type { User } from '../../modules/profile/entities/User';
	import AnimalModal from '$lib/components/layout/AnimalModal.svelte';
	import type { AnimalDto } from '../../modules/profile/dto/AnimalDto';
	import { bounceIn } from 'svelte/easing';

	let userProfile = $state<User | null>(null);
	let animals = $state<any[]>([]);
	let now = $state(new Date());
	let year = $state(0);
	let month = $state(0);
	let day = $state(0);
	let isLoading = $state(false);
	let error = $state<string | null>(null);
	let editHumanMode = $state(false);
	let editPetMode = $state(false);
	
	const formatter = new Intl.DateTimeFormat('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	let { data } = $props();
	let isAnimalModalOpen = $state(false);
	let currentIndex = $state(0);
	let currentPetIndex = $state(0);
	let animalImages = $state([
        'corgi.png',
		'puppy.jpg'
    ]);
	let petsList = ([
		{
			firstName: "Hunter",
			age: 2,
			birthday: "26 décembre",
			species: "Chien",
			breed: "Corgi",
			weight: 7,
			gender: "Men",
			bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque odio, eleifend at vehicula a, efficitur ac arcu. Cras malesuada ornare metus id imperdiet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas varius nunc vitae dui tristique ullamcorper."
		},
		{
			firstName: "Lila",
			age: 1,
			birthday: "03 février",
			species: "Chien",
			breed: "Golden Retriever",
			weight: 3,
			gender: "Woman",
			bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque odio, eleifend at vehicula a, efficitur ac arcu. Cras malesuada ornare metus id imperdiet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas varius nunc vitae dui tristique ullamcorper."
		},
	]);

	function openAnimalModal() {
		isAnimalModalOpen = true;
	}

	function closeAnimalModal() {
		isAnimalModalOpen = false;
	}

	async function saveAnimal(event: CustomEvent<AnimalDto>): Promise<void> {
		try {
			isLoading = true;
			error = null;
			const animalData = event.detail;

			console.log('Animal data:', animalData);


			await loadAnimals();

			closeAnimalModal();
		} catch (err: any) {
			error = err.message || "Une erreur est survenue lors de la création de l'animal";
			console.error('Erreur lors de la sauvegarde:', err);
		} finally {
			isLoading = false;
		}
	}

	async function loadAnimals() {
		try {
			if (!$user?.id) return;

			await trpc($page).animalRouter.getAnimalsByUser.query($user.id);

		} catch (err) {
			console.error('Erreur lors du chargement des animaux:', err);
		}
	}

	function toggleEditHuman(){
		editHumanMode = !editHumanMode;
	}
	function toggleEditPet(){
		editPetMode = !editPetMode;
	}

	function cancel(){
		editHumanMode = false;
    	editPetMode = false;
	}

	function prevPet() {
		currentPetIndex = (currentPetIndex - 1 + petsList.length) % petsList.length;
	}
	function nextPet() {
		currentPetIndex = (currentPetIndex + 1) % petsList.length;
	}

	function nextImage() {
        currentIndex = (currentIndex + 1) % animalImages.length;
    }
	function deleteImage() {
		animalImages.splice(currentIndex, 1);
		nextImage();
	}

	onMount(async () => {
		try {
			isLoading = true;

			if ($user?.id) {
				userProfile = await trpc($page).getUser.query($user.id);

				await loadAnimals();
			}

			year = now.getFullYear();
			month = now.getMonth() + 1;
			day = now.getDate();
		} catch (err) {
			console.error('Erreur lors du chargement des données:', err);
		} finally {
			isLoading = false;
		}
	});
	
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<div class="pt-32 bg-white z-20 h-32 w-full fixed"></div>
	<div class="flex h-4/5 md:h-2/3 flex-col md:flex-row items-center mt-32 pt-10 pb-10">
        {#if userProfile === null}
            <div class="w-2/3 flex items-center justify-center">
                <svg aria-hidden="true" class="w-1/4 h-1/4 animate-spin dark:text-accent fill-secondary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
            <div class="w-1/3 flex flex-col justify-center items-center">
                <button class="bg-accent text-white rounded-full w-3/5 mb-2 opacity-50" disabled>Modifier</button>
                <button class="bg-accent text-white rounded-full w-3/5 mb-2 opacity-50" disabled>Ajouter un animal</button>
                <button class="bg-white text-[#E91414] border border-secondary rounded-full w-3/5 mb-2 opacity-50" disabled>Supprimer le compte</button>
            </div>
        {:else}
            <div class="w-full md:w-1/3 flex justify-center items-center">
                <img src={userProfile.profilePicture} class="md:h-64 h-48 md:w-52 w-40 mt-6 rounded-3xl shadow-[-12px_-12px_#FFDB78] md:shadow-[-24px_-24px_#FFDB78] object-cover" alt="Profil"/>
            </div>
			<form method="POST" action="?/updateUser" use:enhance={() => {
				editHumanMode = !editHumanMode;
			}} class="flex flex-col lg:flex-row w-full md:w-2/3 justify-around mt-5 md:mt-0">
				<div class="w-full lg:w-3/5 flex flex-col justify-center">
					<div class="flex w-full pb-1">
						<p class="w-1/2 lg:w-1/3 text-right text-secondary font-semibold">Prénom :</p>
						<p class="w-1/2 lg:w-2/3 ml-2">{userProfile.firstName}</p>
					</div>
					<div class="flex w-full pb-1">
						<p class="w-1/2 lg:w-1/3 text-right text-secondary font-semibold">Nom :</p>
						<p class="w-1/2 lg:w-2/3 ml-2">{userProfile.lastName}</p>
					</div>
					<div class="flex w-full pb-1">
						<p class="w-1/2 lg:w-1/3 text-right text-secondary font-semibold">Âge :</p>
						<p class="w-1/2 lg:w-2/3 ml-2">{Math.abs((new Date(Date.now() - (new Date(Number(userProfile.birthday.split('/')[2]), Number(userProfile.birthday.split('/')[1])-1, Number(userProfile.birthday.split('/')[0]))).getTime()).getUTCFullYear()) - 1970)}</p>
					</div>
					<div class="flex w-full pb-1">
						<p class="w-1/2 lg:w-1/3 text-right text-secondary font-semibold">Anniversaire :</p>
						<p class="w-1/2 lg:w-2/3 ml-2">{formatter.format(new Date(Number(userProfile.birthday.split('/')[2]), Number(userProfile.birthday.split('/')[1])-1, Number(userProfile.birthday.split('/')[0])))}</p>
					</div>
					<div class="flex w-full pb-1">
						<p class="w-1/2 lg:w-1/3 text-right text-secondary font-semibold">E-mail :</p>
						<p class="w-1/2 lg:w-2/3 ml-2">{userProfile.email}</p>               
					</div>
					<input type="hidden" name="id" value="{userProfile.id}" />
					{#if !editHumanMode}
						<div class="flex w-full pb-1">
							<p class="w-1/2 lg:w-1/3 text-right text-secondary font-semibold">Bio :</p>
							{#if userProfile.bio === ""}
								<p class="w-1/2 lg:w-2/3 ml-2 text-justify">Aucune biographie</p>
							{:else}
								<p class="w-1/2 lg:w-2/3 ml-2 text-justify" id="bio">
									{userProfile.bio}
								</p>
							{/if}
						</div>
					{:else}
						<div class="flex w-full pb-1">
							<label class="w-1/2 lg:w-1/3 text-right text-secondary font-semibold" for="bio">Bio :</label>
							<textarea name="bio" class="border-2 border-accent rounded-lg pt-0.5 pb-0.5 pl-1 ml-2">{userProfile.bio}</textarea>
						</div>
					{/if}
				</div>
				<div class="w-full lg:w-2/5 flex flex-col justify-center items-center mt-5 md:mt-0">
					{#if !editHumanMode}
						<button class="bg-accent text-white rounded-full w-3/5 mb-2" onclick={toggleEditHuman}>Modifier</button>
						<button class="bg-accent text-white rounded-full w-3/5 mb-2" onclick={openAnimalModal}>Ajouter un animal</button>
						<button class="bg-white text-[#E91414] border border-secondary rounded-full w-3/5 mb-2">Supprimer le compte</button>
					{:else}
						<button type="submit" class="bg-accent text-white rounded-full w-3/5 mb-2">Sauvegarder</button>
						<button class="bg-white text-[#E91414] border border-secondary rounded-full w-3/5 mb-2" onclick={cancel}>Annuler</button>
					{/if}
				</div>
			</form>
        {/if}
	</div>
	

	{#if editPetMode}
	<form method="POST" action="?/updatePet" use:enhance class="flex flex-col-reverse md:flex-row items-center bg-secondary bg-opacity-10 md:h-1/2 pt-10 pb-10">
		<div class="flex flex-col lg:flex-row justify-center max-[450px]:w-4/5 w-2/3">
			<div class="w-full lg:w-1/2 flex flex-col justify-center mt-5 lg:mt-0">
				<div class="flex w-full pb-1">
					<label class="max-[600px]:w-1/3 w-2/5 lg:w-1/3 text-right text-secondary font-semibold" for="firstName">Prénom :</label>
					<input type="text" class="border-2 border-accent rounded-lg pt-0.2 pb-0.2 pl-1 ml-2" id="firstName" name="firstName" value={petsList[currentPetIndex].firstName} required/>
				</div>
				<div class="flex w-full pb-1">
					<label class="max-[600px]:w-1/3 w-2/5 lg:w-1/3 text-right text-secondary font-semibold" for="age_pet">Âge :</label>
					<input type="number" class="border-2 border-accent rounded-lg pt-0.2 pb-0.2 pl-1 ml-2 w-16" id="age_pet" name="age_pet" value="2" required/>
					<p class="ml-1">ans</p>
				</div>
				<div class="flex w-full pb-1">
					<label class="max-[600px]:w-1/3 w-2/5 lg:w-1/3 text-right text-secondary font-semibold" for="birthday">Anniversaire :</label>
					<input type="date" class="border-2 border-accent rounded-lg pt-0.2 pb-0.2 pl-1 ml-2" id="birthday_pet" name={petsList[currentPetIndex].birthday} required/>
				</div>
				<div class="flex w-full pb-1">
					<label class="max-[600px]:w-1/3 w-2/5 lg:w-1/3 text-right text-secondary font-semibold" for="species">Espèce :</label>
					<input type="text" class="border-2 border-accent rounded-lg pt-0.2 pb-0.2 pl-1 ml-2" id="species" name="specie" value={petsList[currentPetIndex].species} required/>					
				</div>
				<div class="flex w-full pb-1">
					<label class="max-[600px]:w-1/3 w-2/5 lg:w-1/3 text-right text-secondary font-semibold" for="breed">Race :</label>
					<input type="text" class="border-2 border-accent rounded-lg pt-0.2 pb-0.2 pl-1 ml-2" id="breed" name="breed" value={petsList[currentPetIndex].breed} required/>
				</div>
				<div class="flex w-full pb-1">
					<label class="max-[600px]:w-1/3 w-2/5 lg:w-1/3 text-right text-secondary font-semibold" for="weight">Poids :</label>
					<input type="text" class="border-2 border-accent rounded-lg pt-0.2 pb-0.2 pl-1 ml-2" id="weight" name="weight" value={petsList[currentPetIndex].weight} required/>
				</div>
				<div class="flex w-full pb-1">
					<label class="max-[600px]:w-1/3 w-2/5 lg:w-1/3 text-right text-secondary font-semibold" for="gender">Sexe :</label>
					<div class="flex w-1/2 lg:w-2/3 ml-2 text-justify">	
						<div class="flex items-center ml-2">
							<input type="radio" id="sex" name="sex" value="Mâle" checked/>
							<p class="ml-1">Mâle</p>
							<img src="icons/Male.svg" class="w-5 ml-1 mr-2" alt="Sexe masculin"/>
						</div>
						<div class="flex items-center ml-3">
							<input type="radio" id="sex" name="sex" value="Femelle"/>
							<p class="ml-1">Femelle</p>
							<img src="icons/Female.svg" class="w-5 ml-1" alt="Sexe féminin"/>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full lg:w-1/2 flex flex-col justify-center pl-5 lg:pl-0 pr-5 lg:pr-0 mb-5 lg:mb-0">
				<div class="flex flex-col">
					<label class="text-secondary font-semibold" for="bio">Biographie :</label>
					<textarea class="border-2 border-accent rounded-lg pt-0.5 pb-0.5 pl-1 pr-1 ml-2 text-justify overflow-x-hidden" rows="10" cols="35" id="bio" name="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque odio, eleifend at vehicula a, efficitur ac arcu. Cras malesuada ornare metus id imperdiet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas varius nunc vitae dui tristique ullamcorper.</textarea>
				</div>
				<div class="flex mt-5">
					<button type="submit" class="bg-accent text-white rounded-full w-1/2">Sauvegarder</button>
					<button class="bg-white text-[#E91414] border border-secondary rounded-full w-1/2 ml-5" onclick={cancel}>Annuler</button>
				</div>
			</div>
		</div>
		<div class="flex flex-col w-full md:w-1/3 justify-center items-center">
			<div class="flex">
				<button type="button" onclick={nextImage}>
					<img
						src="{animalImages[currentIndex]}"
						class="rounded-full h-40 lg:h-48 xl:h-64 w-64 shadow-[12px_-12px_#FFDB78] lg:shadow-[24px_-24px_#FFDB78] mt-6 object-cover"
						alt="Profil animal"
					/>
				</button>
			</div>
			<button type="button" onclick={deleteImage} class="flex mt-1 text-secondary font-semibold mb-1">
				Supprimer la photo
				<img src="icons/Trash.svg" alt="Supprimer" width="20px" height="20px" class="ml-1"/>
			</button>
			<label for="fileInput" class="text-secondary font-semibold mb-1">Ajouter une photo :</label>
			<input type="file" id="fileInput">
		</div>
	</form>
	{:else}
	<div class="flex flex-col-reverse md:flex-row items-center bg-secondary bg-opacity-10 md:h-1/2 pt-10 pb-10">
		<button type="button" class="ml-2 lg:ml-4" onclick={prevPet}>
			<img class="h-12 md:h-8 lg:h-12 xl:h-16" src="icons/Left_arrow.svg" alt="Précédent"/>
		</button>
		<div class="flex flex-col lg:flex-row justify-center max-[450px]:w-4/5 w-2/3">
			<div class="w-full lg:w-1/2 flex flex-col justify-center mt-5 lg:mt-0">
				<div class="flex w-full pb-1">
					<p class="w-1/2 text-right text-secondary font-semibold">Prénom :</p>
					<p class="w-1/2 ml-2">{petsList[currentPetIndex].firstName}</p>
				</div>
				<div class="flex w-full pb-1">
					<p class="w-1/2 text-right text-secondary font-semibold">Âge :</p>
					<p class="w-1/2 ml-2">{petsList[currentPetIndex].age} ans</p>
				</div>
				<div class="flex w-full pb-1">
					<p class="w-1/2 text-right text-secondary font-semibold">Anniversaire :</p>
					<p class="w-1/2 ml-2">{petsList[currentPetIndex].birthday}</p>
				</div>
				<div class="flex w-full pb-1">
					<p class="w-1/2 text-right text-secondary font-semibold">Espèce :</p>
					<p class="w-1/2 ml-2">{petsList[currentPetIndex].species}</p>
				</div>
				<div class="flex w-full pb-1">
					<p class="w-1/2 text-right text-secondary font-semibold">Race :</p>
					<p class="w-1/2 ml-2">{petsList[currentPetIndex].breed}</p>
				</div>
				<div class="flex w-full pb-1">
					<p class="w-1/2 text-right text-secondary font-semibold">Poids :</p>
					<p class="w-1/2 ml-2">{petsList[currentPetIndex].weight} kg</p>
				</div>
				<div class="flex w-full pb-1">
					<p class="w-1/2 text-right text-secondary font-semibold">Sexe :</p>
					<div class="flex w-1/2 ml-2 text-justify">
						{#if petsList[currentPetIndex].gender == "Men"}
							<p>Mâle</p>
							<img src="icons/Male.svg" class="w-5 ml-1" alt="Sexe masculin"/>
						{:else}
							<p>Femelle</p>
							<img src="icons/Female.svg" class="w-5 ml-1" alt="Sexe féminin"/>
						{/if}
					</div>
				</div>
			</div>
			<div class="w-full lg:w-1/2 flex flex-col justify-center pl-5 lg:pl-0 pr-5 lg:pr-0 mb-5 lg:mb-0">
				<div class="flex flex-col">
					<p class="text-secondary font-semibold">Biographie :</p>
					<p class="text-justify">
						{petsList[currentPetIndex].bio}
					</p>
				</div>
				<div class="flex mt-5">
					<button class="bg-accent text-white rounded-full w-1/2" onclick={toggleEditPet}>Modifier</button>
					<button class="bg-white text-[#E91414] border border-secondary rounded-full w-1/2 ml-5">Désactiver</button>
				</div>
			</div>
		</div>
		<div class="flex flex-col w-full md:w-1/3 justify-center items-center">
			<div class="flex">
				<button type="button" onclick={nextImage}>
					<img
						src="{animalImages[currentIndex]}"
						class="rounded-full h-40 lg:h-48 xl:h-64 w-64 shadow-[12px_-12px_#FFDB78] lg:shadow-[24px_-24px_#FFDB78] mt-6 object-cover"
						alt="Profil animal"
					/>
				</button>
			</div>
		</div>
		<button type="button" class="mr-4 lg:mr-8" onclick={nextPet}>
			<img class="h-12 md:h-8 lg:h-12 xl:h-16" src="icons/Right_arrow.svg" alt="Suivant"/>
		</button>
	</div>
	{/if}
	<Footer />
</div>

<AnimalModal
	canClose
	data={data.form}
	bind:isOpen={isAnimalModalOpen}
	on:close={closeAnimalModal}
	on:save={saveAnimal}
/>
