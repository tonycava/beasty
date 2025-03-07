<!-- Navbar.svelte -->
<script lang="ts">
	import Svg from '$lib/components/layout/Svg.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import { user } from '$auth/stores/UserStore';
	import { trpc } from '$lib/clients/client';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';

	type Props = {
		sectionsView?: Record<string, boolean>;
		isHomePage?: boolean;
	}

	let {
		sectionsView = {
			home: false,
			beasty: false,
			tryIt: false,
			premium: false
		},
		isHomePage = false
	}: Props = $props();

	const onDisconnect = () => {
		trpc($page).authRouter.logout.mutate();
		user.set(null);
	}

	$effect(() => {
		if (!browser || !isHomePage) return;

		const path = $page.url.pathname;
		if (path === '/') sectionsView.home = true;
		else if (path === '/profil' || path === '/beasty') sectionsView.beasty = true;
		else if (path === '/messages' || path === '/essayer') sectionsView.tryIt = true;
		else if (path === '/premium') sectionsView.premium = true;
	});

	let isMenuOpen = $state(false);

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};
</script>

{#snippet sections(nom: String, sectionView: Boolean)}
	<div class="flex flex-col gap-1 items-center p-2 justify-center group relative">
		<span class="relative z-10">{nom}</span>
		<div class="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform origin-left
      transition-all duration-300 ease-out
      {sectionView ? 'scale-x-100' : 'scale-x-0'}
      group-hover:scale-x-100">
		</div>
	</div>
{/snippet}

<nav class="flex flex-col fixed w-full z-50">
	<div class="flex items-center bg-gradient-to-b from-secondary/15 to-white/15 h-32">
		<div class="flex items-center transition-transform duration-300 hover:scale-110">
			<a href="/" class="cursor-pointer">
				<div class="flex gap-4 items-center p-2 justify-center ml-4">
					<Svg size={18} src="/icons/Logo.svg" />
				</div>
			</a>
			<a href="/" class="cursor-pointer">
				<div class="flex gap-4 items-center p-2 justify-center">
					<Svg size={24} src="/icons/Beasty.svg" />
				</div>
			</a>
		</div>

		<div class="hidden text-secondary mx-auto font-bold space-x-8 text-2xl lg:flex">
			<a href="/" class="cursor-pointer">
				{@render sections("Accueil", sectionsView.home)}
			</a>
			{#if $user}
				<a href="/profile" class="cursor-pointer">
					{@render sections("Profil", sectionsView.beasty)}
				</a>
				<a href="/messages" class="cursor-pointer">
					{@render sections("Messages", sectionsView.tryIt)}
				</a>
				<a href="/premium" class="cursor-pointer">
					{@render sections("Premium", sectionsView.premium)}
				</a>
			{:else}
				<a href="/beasty" class="cursor-pointer">
					{@render sections("Beasty", sectionsView.beasty)}
				</a>
				<a href="/essayer" class="cursor-pointer">
					{@render sections("Essayez-le", sectionsView.tryIt)}
				</a>
				<a href="/premium" class="cursor-pointer">
					{@render sections("Premium", sectionsView.premium)}
				</a>
			{/if}
		</div>

		{#if $user}
			<PrimaryButton
				type="submit"
				class="hidden mr-4 lg:block transform transition-all duration-300 hover:scale-110 hover:rotate-2"
				onclick={onDisconnect}
			>
				<div class="flex gap-4 items-center p-2 justify-center font-bold tracking-widest">
					DECONNEXION
				</div>
			</PrimaryButton>
		{:else}
			<a
				href="/login"
				class="hidden w-fit mr-5 lg:block transform transition-all duration-300 hover:scale-110 hover:rotate-2"
			>
				<PrimaryButton type="submit" class="px-3">
					<div class="flex gap-4 items-center p-2 justify-center font-bold tracking-widest">
						CONNEXION
					</div>
				</PrimaryButton>
			</a>
		{/if}

		<button
			class="flex gap-4 items-center ml-auto p-2 lg:hidden text-secondary mr-4"
			onclick={toggleMenu}
		>
			<Svg size={18} src="/icons/Menu.svg" />
		</button>
	</div>

	{#if isMenuOpen}
		<div
			class="lg:hidden bg-white shadow-lg"
			transition:slide={{ duration: 300 }}
		>
			<div class="flex flex-col py-4 text-secondary font-bold">
				<a href="/" class="px-6 py-3 hover:bg-secondary/10">Accueil</a>
				{#if $user}
					<a href="/profile" class="px-6 py-3 hover:bg-secondary/10">Profil</a>
					<a href="/messages" class="px-6 py-3 hover:bg-secondary/10">Messages</a>
					<a href="/premium" class="px-6 py-3 hover:bg-secondary/10">Premium</a>
					<div class="px-6 py-3">
						<PrimaryButton
							type="submit"
							class="w-full"
							onclick={onDisconnect}
						>
							<div class="flex gap-4 items-center p-2 justify-center font-bold tracking-widest">
								DECONNEXION
							</div>
						</PrimaryButton>
					</div>
				{:else}
					<a href="/beasty" class="px-6 py-3 hover:bg-secondary/10">Beasty</a>
					<a href="/essayer" class="px-6 py-3 hover:bg-secondary/10">Essayez-le</a>
					<a href="/premium" class="px-6 py-3 hover:bg-secondary/10">Premium</a>
					<div class="px-6 py-3">
						<a href="/login" class="block w-full">
							<PrimaryButton type="submit" class="w-full">
								<div class="flex gap-4 items-center p-2 justify-center font-bold tracking-widest">
									CONNEXION
								</div>
							</PrimaryButton>
						</a>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</nav>
