<script lang="ts">
	import Loading from '$lib/components/layout/Loading.svelte';
	import Svg from '$lib/components/layout/Svg.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	let isLoading = $state(false);
</script>

{#if isLoading}
	<Loading absolute />
{/if}

<div class="flex justify-center items-center h-screen flex-col gap-6">

	<div class="flex gap-4 items-center">
		<Svg size={24} src="/icons/Logo.svg" />
		<h1 class="text-3xl text-accent-light text-center">Beasty</h1>
	</div>

	<div class="p-6 rounded-lg w-11/12 sm:w-4/12 shadow-lg">
		{@render children()}
	</div>
</div>
