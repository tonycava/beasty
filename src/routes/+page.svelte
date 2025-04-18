<script lang="ts">
	import type { PageServerData } from './$types';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import Header from '$lib/components/layout/Header.svelte';
	import HomeBeasty from '$lib/components/layout/HomeBeasty.svelte';
	import HomeTryIt from '$lib/components/layout/HomeTryIt.svelte';
	import HomePremium from '$lib/components/layout/HomePremium.svelte';

	type SectionsView = {
		home: boolean;
		beasty: boolean;
		tryIt: boolean;
		premium: boolean;
	};

	let sectionsView: SectionsView = $state({
		home: true,
		beasty: false,
		tryIt: false,
		premium: false
	});

	onMount(() => {
		if (!browser) return;

		window.addEventListener('scroll', () => {
			if (window.scrollY === 0) {
				changeSection('home');
			}
		});
	});


	const changeSection = (section: keyof SectionsView) => {
		const t = Object.keys(sectionsView) as Array<keyof SectionsView>;
		t.forEach((key) => {
			sectionsView[key] = false;
		});
		sectionsView[section] = true;
	};

</script>

<Navbar
	bind:sectionsView
	isHomePage={true}
/>
<div class="pt-32 bg-white z-20 h-32 w-full fixed"></div>
<Header />

<div
	id="beasty"
	use:inview
	oninview_enter={() => {
		changeSection('beasty');
	}}
>
	<HomeBeasty />
</div>

<div
	id="essayer"
	use:inview
	oninview_enter={() => {
		changeSection('tryIt');
	}}
>
	<HomeTryIt />
</div>

<div
	id="premium"
	use:inview
	oninview_enter={() => {
		changeSection('premium');
	}}
>
	<HomePremium />
</div>

<Footer />
