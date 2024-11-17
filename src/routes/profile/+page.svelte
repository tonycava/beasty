<div class="h-screen">
    <div class="flex h-1/2">
        <div class="w-1/3 flex justify-center items-center">
            <img src="/profile_picture.png" class="h-64 w-48 mt-6 rounded-3xl shadow-[-24px_-24px_#FFDB78]" alt="Profil">
        </div>
        <div class="w-1/3 flex flex-col justify-center">
            <div class="flex w-full pb-1">
                <label class="w-1/3 text-right text-secondary font-semibold" for="first_name">Prénom :</label>
                <p class="w-3/4 ml-2" id="first_name">Jane</p>
            </div>
            <div class="flex w-full pb-1">
                <label class="w-1/3 text-right text-secondary font-semibold" for="last_name">Nom :</label>
                <p class="w-3/4 ml-2" id="last_name">Doe</p>
            </div>
            <div class="flex w-full pb-1">
                <label class="w-1/3 text-right text-secondary font-semibold" for="age">Âge :</label>
                <p class="w-3/4 ml-2" id="age">24 ans</p>
            </div>
            <div class="flex w-full pb-1">
                <label class="w-1/3 text-right text-secondary font-semibold" for="birthday">Anniversaire :</label>
                <p class="w-3/4 ml-2" id="birthday">5 mai</p>
            </div>
            <div class="flex w-full pb-1">
                <label class="w-1/3 text-right text-secondary font-semibold" for="email">Adresse e-mail :</label>
                <p class="w-3/4 ml-2" id="email">jane.doe@gmail.com</p>
            </div>
            <div class="flex w-full pb-1">
                <label class="w-1/3 text-right text-secondary font-semibold" for="bio">Bio :</label>
                <p class="w-3/4 ml-2 text-justify" id="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <!-- <ul class="w-1/3 text-right text-secondary">
                <li class="">Prénom :</li>
                <li>Nom :</li>
                <li>Âge :</li>
                <li>Anniversaire :</li>
                <li>Adresse e-mail :</li>
                <li>Bio :</li>
            </ul>
            <ul class="w-2/3 ml-2">
                <li class="">Jane</li>
                <li>Doe</li>
                <li>24 ans</li>
                <li>5 mai</li>
                <li>jane.doe@gmail.com</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
            </ul> -->
        </div>
        <div class="w-1/3 flex flex-col justify-center items-center">
            <button class="bg-accent text-white rounded-full w-3/5 mb-2">Modifier</button>
            <button class="bg-accent text-white rounded-full w-3/5 mb-2">Ajouter un animal</button>
            <button class="bg-white text-[#E91414] border border-secondary rounded-full w-3/5 mb-2">Supprimer le compte</button>
        </div>
    </div>
    <div class="flex bg-secondary bg-opacity-10 h-1/2">
        <div class="w-1/3 flex flex-col justify-center">
            <div class="flex w-full pb-1">
                <label class="w-1/2 text-right text-secondary font-semibold" for="first_name">Prénom :</label>
                <p class="w-1/2 ml-2" id="first_name_pet">Hunter</p>
            </div>
            <div class="flex w-full pb-1">
                <label class="w-1/2 text-right text-secondary font-semibold" for="age_pet">Âge :</label>
                <p class="w-1/2 ml-2" id="age_pet">2 ans</p>
            </div>
            <div class="flex w-full pb-1">
                <label class="w-1/2 text-right text-secondary font-semibold" for="birthday_pet">Anniversaire :</label>
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
                    <img src="icons/Male.svg" class="ml-2 w-4" alt="Suivant">
                </div>
            </div>
        </div>
        <div class="w-1/3 flex flex-col justify-center">
            <div>
                <label class="text-secondary font-semibold" for="bio_pet">Biographie :</label>
                <p class="text-justify" id="bio_pet">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque odio, eleifend at vehicula a, efficitur ac arcu. Cras malesuada ornare metus id imperdiet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas  varius nunc vitae dui tristique ullamcorper.</p>
            </div>
            <div class="flex mt-5">
                <button class="bg-accent text-white rounded-full w-1/2">Modifier</button>
                <button class="bg-white text-[#E91414] border border-secondary rounded-full w-1/2 ml-5">Désactiver</button>
            </div>
        </div>
        <div class="w-1/3 flex justify-center items-center">
            <button type="button" class="mr-4">
                <img src="icons/Left_arrow.svg" alt="Précédent">
            </button>
            <img src="corgi.png" class="rounded-full h-64 shadow-[24px_-24px_#FFDB78] mt-6" alt="Profil animal">
            <button type="button" class="ml-8">
                <img src="icons/Right_arrow.svg" alt="Suivant">
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