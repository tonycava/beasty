<script lang="ts">
	import type { PageServerData } from './$types';
	import { LogoutUseCase } from '$auth/usecases/LogoutUser';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Cookies from 'js-cookie';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import Header from '$lib/components/layout/Header.svelte';
	import HomeBeasty from '$lib/components/layout/HomeBeasty.svelte';


	type Props = {
		data: PageServerData;
	};

	let { data }: Props = $props();

	type SectionsView = {
		home: boolean;
		beasty: boolean;
		tryIt: boolean;
		premium: boolean;
	};

	onMount(() => {
		if (!browser) return;
		window.addEventListener('scroll', () => {
			if (window.scrollY === 0) {
				changeSection('home');
			}
		});
	});

	let sectionsView: SectionsView = $state({
		home: true,
		beasty: false,
		tryIt: false,
		premium: false
	});

	const changeSection = (section: keyof SectionsView) => {
		const t = Object.keys(sectionsView) as Array<keyof SectionsView>;
		t.forEach((key) => {
			sectionsView[key] = false;
		});
		sectionsView[section] = true;
	};

	$inspect({ sectionsView });
	const disconnect = () => {
		LogoutUseCase({ cookieProvider: Cookies }).execute();
	};
</script>

<Navbar
	bind:sectionsView
	isHomePage={true}
/>

<div class="pt-32 bg-white z-20 h-32 w-full fixed"></div>

<Header />

<HomeBeasty/>

<div
		style="height: 2000px"
		use:inview
		oninview_enter={() => {
			changeSection('beasty');
		}}
	>
		<span> Beasty </span>
	</div>

	<div
		style="height: 2000px"
		use:inview
		oninview_enter={() => {
			changeSection('tryIt');
		}}
	>
		<span> tryIt </span>
	</div>

	<div
		style="height: 2000px"
		use:inview
		oninview_enter={() => {
			changeSection('premium');
		}}
	>
		<span> Premium </span>
	</div>

<Footer />
