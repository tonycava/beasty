<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import Svg from '$lib/components/layout/Svg.svelte';
	import type { PageServerData } from './$types';

	type LoginProps = {
		data: PageServerData
	};

	let { data }: LoginProps = $props();
</script>

<a href={data.url}>
	<PrimaryButton variant="primary" type="submit" class="w-[95%] text-accent-light mx-auto font-bold">
		<div class="flex gap-4 items-center p-2 justify-center">
			<Svg size={8} src="/icons/Google.svg" />
			Login with google
		</div>
	</PrimaryButton>
</a>