<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { PageServerData } from './$types';
	import { SubscriptionTier } from '$lib/utils/subscriptionTier';
	import type { Tier } from '$lib/utils/tier';
	import { user } from '$auth/stores/UserStore';
	import { trpc } from '$lib/clients/client';
	import { page } from '$app/stores';
	import PricingComparison from '$lib/components/layout/PricingComparison.svelte';

	export let data: PageServerData;

	let hoveredCard: string | null = null;

	function handleMouseEnter(cardId: string) {
		hoveredCard = cardId;
	}

	function handleMouseLeave() {
		hoveredCard = null;
	}

	$: cardScale = (cardId: string) => hoveredCard === cardId ? 1.05 : 1;

	function formatPrice(priceInCents: number) {
		return (priceInCents / 100).toFixed(2);
	}

	function getCardStyle(tier: Tier) {
		switch (tier.name) {
			case SubscriptionTier.Premium:
				return 'bg-orange-100';
			case SubscriptionTier.Business:
				return 'bg-teal-600 text-white md:col-span-2 lg:col-span-1 md:max-w-xl lg:max-w-none mx-auto w-full';
			default:
				return 'bg-white';
		}
	}

	function getButtonStyle(tier: Tier) {
		switch (tier.name) {
			case SubscriptionTier.Essentiel:
				return 'bg-gray-50 text-black hover:bg-gray-100';
			case SubscriptionTier.Premium:
				return 'bg-orange-500 text-white hover:bg-orange-600';
			case SubscriptionTier.Business:
				return 'bg-white text-teal-600 hover:bg-teal-50';
			default:
				return 'bg-gray-50 text-black hover:bg-gray-100';
		}
	}

	function getButtonText(tier: Tier, isCurrent: boolean) {
		if (data.userSubscriptionTier !== SubscriptionTier.Free) {
			if (isCurrent) {
				return 'Abonnement actuel';
			}
			return 'Changer';
		}

		switch (tier.name) {
			case SubscriptionTier.Essentiel:
				return 'Commencer';
			case SubscriptionTier.Premium:
				return 'Devenir Premium';
			case SubscriptionTier.Business:
				return 'Prendre l\'abonnement business';
			default:
				return 'Choisir';
		}
	}


	async function checkout(tier: SubscriptionTier) {
		const url = await trpc($page).subscriptionRouter.getCheckoutSession.query({ tier });
		if (!url) {
			alert('Une erreur est survenue lors de la création de la session de paiement');
			return;
		}
		window.location.replace(url);
	}
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<div class="pt-32 bg-white z-20 h-32 w-full fixed"></div>

	<main class="flex-grow bg-white px-4 sm:px-6 lg:px-8 mt-32">
		<div class="max-w-7xl mx-auto py-8">
			<div class="text-center" in:fade="{{ duration: 1000 }}">
				<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Devenez premium pour rencontrer</h2>
				<p class="text-xl sm:text-2xl md:text-3xl font-semibold text-orange-400 mb-8 sm:mb-12">encore plus de membres
					!</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				{#each data.paidTiers as tier, index}
					{@const isCurrent = tier.subscriptionTier === data.userSubscriptionTier}
					{@const isDisabled = isCurrent || $user === null}

					<div
						role="button"
						tabindex="0"
						in:fly="{{ y: 50, duration: 1000, delay: 200 * (index + 1) }}"
						class="rounded-lg shadow-lg p-6 sm:p-8 transform transition-transform duration-300 relative {getCardStyle(tier)}"
						style="transform: scale({cardScale(tier.name.toLowerCase())})"
						onmouseenter={() => handleMouseEnter(tier.name.toLowerCase())}
						onmouseleave={handleMouseLeave}
					>
						{#if tier.name === SubscriptionTier.Premium}
							<div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
								<span class="bg-orange-500 text-white px-4 py-1 rounded-full text-xs sm:text-sm">Populaire</span>
							</div>
						{/if}

						<div class="h-full flex flex-col">
							<div class="flex-grow">
								<h3 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{tier.name}</h3>
								<p
									class="{tier.name === SubscriptionTier.Business ? 'text-white' : 'text-gray-600'} mb-3 sm:mb-4">{tier.description}</p>
								<p class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
									{formatPrice(tier.priceInCents)} €<span
									class="text-base sm:text-lg font-normal">{tier.name === 'Business' ? ' /an' : ' /mois'}</span>
								</p>

								<ul class="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
									{#each tier.features as feature}
										<li class="flex items-center">
											<svg
												class="w-5 h-5 {tier.name === SubscriptionTier.Business ? 'text-teal-200' : 'text-green-500'} mr-2 flex-shrink-0"
												fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
											</svg>
											<span class="text-sm sm:text-base">{feature}</span>
										</li>
									{/each}
								</ul>
							</div>

							<button
								onclick={() => checkout(tier.subscriptionTier)}
								disabled={isDisabled}
								class={`w-full ${getButtonStyle(tier)} py-2 sm:py-3 px-4 sm:px-6
          rounded-lg font-semibold transition-colors duration-300 mt-auto
          text-sm sm:text-base
          ${isDisabled ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500" : ""}`}>
								{getButtonText(tier, isCurrent)}
							</button>

						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="space-y-16 pb-6">
			<PricingComparison />
		</div>
	</main>

	<Footer />
</div>
