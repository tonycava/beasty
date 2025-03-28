<script lang="ts">
	import type { AddCss } from '$lib/utils/svelte.utils';
	import type { InputConstraint } from 'sveltekit-superforms';

	type InputFieldProps = {
		title: string;
		value: string | null;
		name: string;
		type: 'date' | 'text' | 'password' | 'radio' | 'checkbox';
		placeholder: string;
	} & AddCss &
		InputConstraint;

	let {
		title,
		value = $bindable(),
		name = '',
		type = 'text',
		placeholder = '',
		class: className = '',
		...props
	}: InputFieldProps = $props();

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>

<fieldset class="flex gap-1 flex-col">
	<p class="text-secondary font-poppins-regular mt-2">{title}</p>
	<input
		use:typeAction
		{...props}
		{name}
		{placeholder}
		bind:value
		class="font-space-mono bg-bg-dark text-accent-dark p-2 border-2 border-lightless rounded w-full focus-visible:outline-none focus-visible:border-primary-medium {className}"
	/>
</fieldset>


<style>
    ::-webkit-calendar-picker-indicator {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="%23bbbbbb" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
    }
</style>