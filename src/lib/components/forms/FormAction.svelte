<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import type { AddCss } from '$lib/utils/svelte.utils';
	import Loading from '$lib/components/layout/Loading.svelte';

	type FormActionProps = {
		children: Snippet;
		action: string;
	} & AddCss;

	let isLoading = $state(false);
	let { children, action, class: className }: FormActionProps = $props();

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);
			isLoading = false;
		};
	};

</script>

{#if isLoading}
	<Loading absolute />
{:else}
	<form
		{action}
		method="POST"
		class={className}
		enctype="multipart/form-data"
		use:enhance={handleSubmit}
	>
		{@render children()}
	</form>
{/if}

