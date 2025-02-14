<script>
    const cartes = [
        { top: '-20px', left: '-30px', rotate: '3deg', bg: '#3B7080', height: '450px', width: '380px' },
        { top: '-40px', left: '120px', rotate: '-5deg', bg: '#FF9F63', height: '470px', width: '390px' },
        { top: '50px', right: '-50px', rotate: '8deg', bg: '#3B7080', height: '480px', width: '400px' },
        { top: '10px', right: '200px', rotate: '-4deg', bg: '#FF9F63', height: '460px', width: '390px' },
        { top: '-10px', left: '250px', rotate: '6deg', bg: '#3B7080', height: '470px', width: '390px' },
        { top: '100px', left: '-60px', rotate: '-2deg', bg: '#FF9F63', height: '450px', width: '380px' },
        { top: '80px', right: '50px', rotate: '5deg', bg: '#3B7080', height: '480px', width: '400px' },
        { top: '20px', left: '350px', rotate: '-8deg', bg: '#FF9F63', height: '460px', width: '390px' },
        { top: '120px', left: '0px', rotate: '7deg', bg: '#3B7080', height: '450px', width: '380px' }
    ];
</script>
<div class="flex h-screen w-screen items-center justify-center">
	<div class="relative h-[550px] w-[950px] rounded-[10px] border border-black bg-[#FFF0C8] p-5">
		<!-- Carte principale -->
		<div
			class="absolute flex h-[400px] w-[336px] flex-col items-center justify-start rounded-[10px] bg-[#3B7080] p-6"
			style="left: 25px; top: 25px;"
		>
			<div class="mb-2 h-[275px] w-[275px] bg-gray-300"></div>
			<div class="my-4 h-[2px] w-full bg-white"></div>
			<div
				class="flex justify-center text-white"
				style="font-family: 'Poppins', sans-serif; font-size: 30px;"
			>
				<div class="mr-2">Hunter</div>
				<div>2 ans</div>
			</div>
		</div>
		<!-- Cartes dupliquées en arrière-plan -->
        {#each cartes as carte}
            <div
                class="absolute -z-10"
                style="
                    top: {carte.top};
                    {carte.left ? `left: ${carte.left};` : ''}
                    {carte.right ? `right: ${carte.right};` : ''}
                    transform: rotate({carte.rotate});
                "
            >
                <div
                    class="flex"
                    style="
                        height: {carte.height};
                        width: {carte.width};
                        background-color: {carte.bg};
                        border-radius: 10px;
                    "
                ></div>
            </div>
        {/each}
		<!-- Section description -->
		<div class="absolute flex flex-col justify-start p-6" style="left: 400px; top: 25px;">
			<div
				class="font-semibold text-[#FF9F63]"
				style="font-family: 'Poppins', sans-serif; font-size: 17px;"
			>
				Description :
			</div>
			<div class="mt-4 text-black" style="font-family: 'Poppins', sans-serif; font-size: 15px;">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque odio, eleifend at
				vehicula a, efficitur ac arcu. Cras malesuada ornare metus id imperdiet. Interdum et
				malesuada fames ac ante ipsum primis in faucibus. Maecenas varius nunc vitae dui tristique
				ullamcorper.
			</div>
			<div class="mx-auto my-8 h-[1px] w-3/4 bg-black"></div>
			<ul class="text-black" style="font-family: 'Poppins', sans-serif; font-size: 20px;">
				<li class="grid grid-cols-2">
					<span
						class="font-semibold text-[#FF9F63]"
						style="font-family: 'Poppins', sans-serif; font-size: 17px;">Anniversaire :</span
					>
					<span class="text-black" style="font-family: 'Poppins', sans-serif; font-size: 15px;"
						>26 Décembre</span
					>
				</li>
				<li class="grid grid-cols-2">
					<span
						class="font-semibold text-[#FF9F63]"
						style="font-family: 'Poppins', sans-serif; font-size: 17px;">Espèce :</span
					>
					<span class="text-black" style="font-family: 'Poppins', sans-serif; font-size: 15px;"
						>Chien</span
					>
				</li>
				<li class="grid grid-cols-2">
					<span
						class="font-semibold text-[#FF9F63]"
						style="font-family: 'Poppins', sans-serif; font-size: 17px;">Race :</span
					>
					<span class="text-black" style="font-family: 'Poppins', sans-serif; font-size: 15px;"
						>Corgi</span
					>
				</li>
				<li class="grid grid-cols-2">
					<span
						class="font-semibold text-[#FF9F63]"
						style="font-family: 'Poppins', sans-serif; font-size: 17px;">Sexe :</span
					>
					<span class="text-black" style="font-family: 'Poppins', sans-serif; font-size: 15px;"
						>Mâle</span
					>
				</li>
			</ul>
		</div>
		<!-- Boutons en bas -->
		<div class="absolute bottom-0 left-0 right-0 mb-8 flex justify-center gap-5 p-3">
			<button
				class="ml-auto flex h-[65px] w-[72px] items-center justify-center rounded-[20px] bg-[#3B7080]"
				aria-label="Bouton avec icône"
			>
				<div class="flex h-[50px] w-[50px] items-center justify-center bg-gray-300"></div>
			</button>
			<button
				class="flex w-72 items-center justify-center rounded-[16px] border-2 border-[#FF9F63] text-[#FF9F63]"
			>
				Message
			</button>
			<button
				class="mr-auto flex h-[65px] w-[72px] items-center justify-center rounded-[20px] bg-[#FF9F63]"
				aria-label="Bouton avec icône"
			>
				<div class="flex h-[50px] w-[50px] items-center justify-center bg-gray-300"></div>
			</button>
		</div>
	</div>
</div>