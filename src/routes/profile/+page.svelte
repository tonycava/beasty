<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$auth/stores/UserStore';
	import { trpc } from '$lib/clients/client';
	import { onMount } from 'svelte';
	import type { User } from '../../modules/profile/entities/User';

	let userProfile: User | null = null;
    let now = new Date();
    let year = 0;
    let month = 0;
    let day = 0;

    const formatter = new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

	onMount(async () => {
		userProfile = await trpc($page).getUser.query($user?.id!);
        year = now.getFullYear();
        month = now.getMonth()+1;
        day = now.getDate();
        console.log(user);
	});
</script>
<div class="h-screen">
	<div class="flex h-1/2">
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
            <div class="w-1/3 flex justify-center items-center">
                <img src={userProfile.profilePicture} class="h-64 w-48 mt-6 rounded-3xl shadow-[-24px_-24px_#FFDB78]" alt="Profil"/>
            </div>
            <div class="w-1/3 flex flex-col justify-center">
                <div class="flex w-full pb-1">
                    <label class="w-1/3 text-right text-secondary font-semibold" for="first_name">Prénom :</label>
                    <p class="w-3/4 ml-2" id="first_name">{userProfile.firstName}</p>
                </div>
                <div class="flex w-full pb-1">
                    <label class="w-1/3 text-right text-secondary font-semibold" for="last_name">Nom :</label>
                    <p class="w-3/4 ml-2" id="last_name">{userProfile.lastName}</p>
                </div>
                <div class="flex w-full pb-1">
                    <label class="w-1/3 text-right text-secondary font-semibold" for="age">Âge :</label>
                    {#if ((month > Number((userProfile.birthday.split('/'))[1]) || year > Number((userProfile.birthday.split('/'))[2])) || (day >= Number((userProfile.birthday.split('/'))[0])) && (month = Number((userProfile.birthday.split('/'))[1])))}
                        <p class="w-3/4 ml-2" id="age"> {(year-Number((userProfile.birthday.split('/'))[2]))} ans</p>
                    {:else}
                        <p class="w-3/4 ml-2" id="age"> {(year-Number((userProfile.birthday.split('/'))[2]))-1} ans</p>
                    {/if}
                </div>
                <div class="flex w-full pb-1">
                    <label class="w-1/3 text-right text-secondary font-semibold" for="birthday">Anniversaire :</label>
                    <p class="w-3/4 ml-2" id="birthday">{formatter.format(new Date(Number(userProfile.birthday.split('/')[2]), Number(userProfile.birthday.split('/')[1])-1, Number(userProfile.birthday.split('/')[0])))}</p>
                </div>
                <div class="flex w-full pb-1">
                    <label class="w-1/3 text-right text-secondary font-semibold" for="email"
                        >Adresse e-mail :</label>
                    <p class="w-3/4 ml-2" id="email">{userProfile.email}</p>                
                </div>
                <div class="flex w-full pb-1">
                    <label class="w-1/3 text-right text-secondary font-semibold" for="bio">Bio :</label>
                    <p class="w-3/4 ml-2 text-justify" id="bio">
                    
                    </p>
                </div>
            </div>
            <div class="w-1/3 flex flex-col justify-center items-center">
                <button class="bg-accent text-white rounded-full w-3/5 mb-2">Modifier</button>
                <button class="bg-accent text-white rounded-full w-3/5 mb-2">Ajouter un animal</button>
                <button class="bg-white text-[#E91414] border border-secondary rounded-full w-3/5 mb-2">Supprimer le compte</button>
            </div>
        {/if}
	</div>
	<div class="flex bg-secondary bg-opacity-10 h-1/2">
		<div class="w-1/3 flex flex-col justify-center">
			<div class="flex w-full pb-1">
				<label class="w-1/2 text-right text-secondary font-semibold" for="first_name"
					>Prénom :</label
				>
				<p class="w-1/2 ml-2" id="first_name_pet">Hunter</p>
			</div>
			<div class="flex w-full pb-1">
				<label class="w-1/2 text-right text-secondary font-semibold" for="age_pet">Âge :</label>
				<p class="w-1/2 ml-2" id="age_pet">2 ans</p>
			</div>
			<div class="flex w-full pb-1">
				<label class="w-1/2 text-right text-secondary font-semibold" for="birthday_pet"
					>Anniversaire :</label
				>
				<p class="w-1/2 ml-2" id="birthday_pet">26 décembre</p>
			</div>
			<div class="flex w-full pb-1">
				<label class="w-1/2 text-right text-secondary font-semibold" for="specie">Espèce :</label>
				<p class="w-1/2 ml-2" id="specie">Chien</p>
			</div>
			<div class="flex w-full pb-1">
				<label class="w-1/2 text-right text-secondary font-semibold" for="breed">Race :</label>
				<p class="w-1/2 ml-2" id="breed">Corgi</p>
			</div>
			<div class="flex w-full pb-1">
				<label class="w-1/2 text-right text-secondary font-semibold" for="gender">Sexe :</label>
				<div class="flex w-1/2 ml-2 text-justify">
					<p id="gender">Mâle</p>
					<img src="icons/Male.svg" class="ml-2 w-4" alt="Suivant" />
				</div>
			</div>
		</div>
		<div class="w-1/3 flex flex-col justify-center">
			<div>
				<label class="text-secondary font-semibold" for="bio_pet">Biographie :</label>
				<p class="text-justify" id="bio_pet">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque odio, eleifend
					at vehicula a, efficitur ac arcu. Cras malesuada ornare metus id imperdiet. Interdum et
					malesuada fames ac ante ipsum primis in faucibus. Maecenas varius nunc vitae dui tristique
					ullamcorper.
				</p>
			</div>
			<div class="flex mt-5">
				<button class="bg-accent text-white rounded-full w-1/2">Modifier</button>
				<button class="bg-white text-[#E91414] border border-secondary rounded-full w-1/2 ml-5"
					>Désactiver</button
				>
			</div>
		</div>
		<div class="w-1/3 flex justify-center items-center">
			<button type="button" class="mr-4">
				<img src="icons/Left_arrow.svg" alt="Précédent" />
			</button>
			<img
				src="corgi.png"
				class="rounded-full h-64 shadow-[24px_-24px_#FFDB78] mt-6"
				alt="Profil animal"
			/>
			<button type="button" class="ml-8">
				<img src="icons/Right_arrow.svg" alt="Suivant" />
			</button>
			<!-- <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-accent rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button> -->
		</div>
	</div>
</div>