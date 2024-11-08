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
	<div class="flex gap-4 items-center p-2 justify-center ml-4">
		<Svg size={18} src="/icons/Logo.svg" />
	</div>
	<div class="flex gap-4 items-center p-2 justify-center">
		<Svg size={24} src="/icons/Beasty.svg" />
	</div>
	<div class="flex text-secondary mx-auto font-bold space-x-8 text-2xl">
		{@render sections("Accueil", sectionsView.home)}
		{#if $user}
			{@render sections("Profil", sectionsView.beasty)}
			{@render sections("Messages", sectionsView.tryIt)}
			{@render sections("BeastyMatcher", sectionsView.premium)}
		{:else}
			{@render sections("Beasty", sectionsView.beasty)}
			{@render sections("Essayez-le", sectionsView.tryIt)}
			{@render sections("Premium", sectionsView.premium)}
		{/if}
	</div>
	{#if $user}
			<PrimaryButton type="submit" class="w-[10%] text-lg mr-4" onclick={onDisconnect}>
				<div class="flex gap-4 items-center p-2 justify-center font-bold tracking-widest">
					DECONNEXION
				</div>
			</PrimaryButton>
	{:else}
		<a href={connectionUrl} class="w-fit text-lg mr-5">
			<PrimaryButton type="submit" class="px-3">
				<div class="flex gap-4 items-center p-2 justify-center font-bold tracking-widest">
					CONNEXION
				</div>
			</PrimaryButton>
		</a>
	{/if}
</nav>