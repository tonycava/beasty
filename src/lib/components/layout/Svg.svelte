<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let src: string;
	export let size = 4;
	export let color = '';
	export let className = '';

	onMount(() => {

	})

	let svg = "";
	$: if (src && browser)
		fetch(src)
			.then((r) => r.text())
			.then((text) => (svg = text));

	$: if (color) {
		// test if regex is found
		if (svg?.match(/fill="[^"]*"/g)) svg = svg?.replace(/fill="[^"]*"/g, `fill="${color}"`);
		else svg = svg?.replace(/<svg/g, `<svg fill="${color}"`);
	}
</script>

<div
	on:click
	style="height: {0.25 * size}rem; width: {0.25 * size}rem;"
	class="[&>svg]:h-full [&>svg]:w-full {className}"
>
	{@html svg}
</div>