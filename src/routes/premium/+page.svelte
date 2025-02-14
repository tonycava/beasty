<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let hoveredCard: string | null = null;

	function handleMouseEnter(cardId: string) {
		hoveredCard = cardId;
	}

	function handleMouseLeave() {
		hoveredCard = null;
	}

	$: cardScale = (cardId: string) => hoveredCard === cardId ? 1.05 : 1;
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<div class="pt-32 bg-white z-20 h-32 w-full fixed"></div>

	<main class="flex-grow bg-white px-4 sm:px-6 lg:px-8 mt-32">
		<div class="max-w-7xl mx-auto py-8">
			<div class="text-center" in:fade="{{ duration: 1000 }}">
				<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Devenez premium pour rencontrer</h2>
				<p class="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-400 mb-8 sm:mb-12">encore plus de membres !</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				<div
					role="button"
					tabindex="0"
					in:fly="{{ y: 50, duration: 1000, delay: 200 }}"
					class="bg-white rounded-lg shadow-lg p-6 sm:p-8 transform transition-transform duration-300 relative"
					style="transform: scale({cardScale('essentiel')})"
					on:mouseenter={() => handleMouseEnter('essentiel')}
					on:mouseleave={handleMouseLeave}
				>
					<div class="h-full flex flex-col">
						<div class="flex-grow">
							<h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Essentiel</h3>
							<p class="text-gray-600 mb-3 sm:mb-4">Parfait pour commencer</p>
							<p class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">9,99 €<span class="text-base sm:text-lg font-normal">/mois</span></p>

							<ul class="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
								<li class="flex items-center">
									<svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Personnalisation basique du profil</span>
								</li>
								<li class="flex items-center">
									<svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Jusqu'à 3 photos d'animaux</span>
								</li>
								<li class="flex items-center">
									<svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">10 matchs par jour</span>
								</li>
							</ul>
						</div>

						<button class="w-full bg-gray-50 text-black py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 mt-auto text-sm sm:text-base">
							Commencer
						</button>
					</div>
				</div>

				<div
					role="button"
					tabindex="0"
					in:fly="{{ y: 50, duration: 1000, delay: 400 }}"
					class="bg-orange-100 rounded-lg shadow-lg p-6 sm:p-8 transform transition-transform duration-300 relative"
					style="transform: scale({cardScale('premium')})"
					on:mouseenter={() => handleMouseEnter('premium')}
					on:mouseleave={handleMouseLeave}
				>
					<div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
						<span class="bg-orange-500 text-white px-4 py-1 rounded-full text-xs sm:text-sm">Populaire</span>
					</div>

					<div class="h-full flex flex-col">
						<div class="flex-grow">
							<h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Premium</h3>
							<p class="text-gray-600 mb-3 sm:mb-4">Idéal pour les passionnés d'animaux</p>
							<p class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">19,99 €<span class="text-base sm:text-lg font-normal">/mois</span></p>

							<ul class="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
								<li class="flex items-center">
									<svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Tous les avantages Essentiel</span>
								</li>
								<li class="flex items-center">
									<svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Photos d'animaux illimitées</span>
								</li>
								<li class="flex items-center">
									<svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Matchs illimités</span>
								</li>
								<li class="flex items-center">
									<svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Filtres avancés</span>
								</li>
								<li class="flex items-center">
									<svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Support prioritaire</span>
								</li>
							</ul>
						</div>

						<button class="w-full bg-orange-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 mt-auto text-sm sm:text-base">
							Devenir Premium
						</button>
					</div>
				</div>

				<div
					role="button"
					tabindex="0"
					in:fly="{{ y: 50, duration: 1000, delay: 600 }}"
					class="bg-teal-600 text-white rounded-lg shadow-lg p-6 sm:p-8 transform transition-transform duration-300 relative
        md:col-span-2 lg:col-span-1 md:max-w-xl lg:max-w-none mx-auto w-full"
					style="transform: scale({cardScale('pro')})"
					on:mouseenter={() => handleMouseEnter('pro')}
					on:mouseleave={handleMouseLeave}
				>
					<div class="h-full flex flex-col">
						<div class="flex-grow">
							<h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Professionnel</h3>
							<p class="text-teal-100 mb-3 sm:mb-4">Pour les entreprises animalières</p>
							<p class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">49,99 €<span class="text-base sm:text-lg font-normal">/mois</span></p>

							<ul class="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
								<li class="flex items-center">
									<svg class="w-5 h-5 text-teal-200 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Tous les avantages Premium</span>
								</li>
								<li class="flex items-center">
									<svg class="w-5 h-5 text-teal-200 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Badge professionnel</span>
								</li>
								<li class="flex items-center">
									<svg class="w-5 h-5 text-teal-200 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Annonces mises en avant</span>
								</li>
								<li class="flex items-center">
									<svg class="w-5 h-5 text-teal-200 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span class="text-sm sm:text-base">Tableau de bord analytique</span>
								</li>
							</ul>
						</div>

						<button class="w-full bg-white text-teal-600 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-teal-50 transition-colors duration-300 mt-auto text-sm sm:text-base">
							Prendre l'abonnement
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>

	<Footer />
</div>