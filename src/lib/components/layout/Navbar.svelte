<script lang="ts">
	import Svg from '$lib/components/layout/Svg.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import { user } from '$auth/stores/UserStore';
	import { trpc } from '$lib/clients/client';
	import { page } from '$app/stores';

	type Props = {
		connectionUrl: string;
		sectionsView: Record<string, boolean>;
	}

	let { connectionUrl, sectionsView = $bindable() }: Props = $props();

	const onDisconnect = () => {
		trpc($page).authRouter.logout.mutate();
		user.set(null);
	}
</script>

{#snippet sections(nom, sectionView)}
	<div class="flex-row gap-4 items-center p-2 justify-center">
		<span>{nom}</span>
		{#if sectionView}
			{#if nom === "Accueil"}
				<div class="h-0.5 w-full bg-secondary"></div>
			{:else}
				<div class="h-0.5 w-full bg-secondary"></div>
			{/if}
		{/if}
	</div>
{/snippet}

<nav class="flex items-center bg-gradient-to-b from-secondary/15 to-white/15 fixed w-full z-50 h-32">
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
	<div class="hidden text-secondary mx-auto font-bold space-x-8 text-2xl lg:flex">
		<a href="/" class="cursor-pointer">
		{@render sections("Accueil", sectionsView.home)}
		</a>
		{#if $user}
			<a href="/profil" class="cursor-pointer">
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
			<PrimaryButton type="submit" class="hidden w-[10%] lg:text-lg mr-4 lg:block" onclick={onDisconnect}>
				<div class="flex gap-4 items-center p-2 justify-center font-bold tracking-widest">
					DECONNEXION
				</div>
			</PrimaryButton>
	{:else}
		<a href={connectionUrl} class="hidden w-fit lg:text-lg mr-5 lg:block">
			<PrimaryButton type="submit" class="px-3">
				<div class="flex gap-4 items-center p-2 justify-center font-bold tracking-widest">
					CONNEXION
				</div>
			</PrimaryButton>
		</a>
	{/if}
	<button class="flex gap-4 items-center ml-auto p-2 lg:hidden text-secondary">
		<Svg size={18} src="/icons/Menu.svg" />
	</button>
</nav>