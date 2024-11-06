<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { AddCss } from '$lib/utils/svelte.utils';

	type PrimaryButtonProps = {
		onclick?: () => void;
		children?: Snippet;
		variant?: 'primary' | 'outline';
		type?: 'button' | 'submit' | 'reset' | null;
	} & AddCss;
	let { variant, onclick, class: className, children, type = "button" }: PrimaryButtonProps = $props();
</script>

<button
	{type}
	{onclick}
	class="font-space-mono rounded-md {variant === 'primary' ? 'text-accent border-2 border-primary' : 'border border-zinc-800 hover:bg-zinc-900/50'} {className}"
>
	<!-- Insted of <slot /> -->
	{@render children?.()}
</button>
