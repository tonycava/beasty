<script lang="ts">
	import type { PageServerData } from './$types';
	import { user } from '$auth/stores/UserStore';
	import { LogoutUseCase } from '$auth/usecases/LogoutUser';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import {inview} from 'svelte-inview';
	import Cookies from 'js-cookie';
    import { Messeys } from '$lib/utils/messages.utils';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	type Props = {
		data: PageServerData;
	}

	let { data }: Props = $props();

	type SectionsView = {
		"home": boolean,
		"beasty": boolean,
		"tryIt": boolean,
		"premium": boolean,
	}

	onMount(() => {
		if (!browser) return
		window.addEventListener("scroll", () => {
			if (window.scrollY === 0) {
				changeSection('home')
			}
		});
	})

	let sectionsView: SectionsView = $state({
		"home": true,
		"beasty": false,
		"tryIt": false,
		"premium": false,
	})

	const changeSection = (section: keyof SectionsView) => {
		const t = 	Object.keys(sectionsView) as Array<keyof SectionsView>;
		t.forEach((key) => {
			sectionsView[key] = false
		})
		sectionsView[section] = true
	}

	$inspect({ sectionsView });
	const disconnect = () => {
		LogoutUseCase({ cookieProvider: Cookies }).execute()
	}
</script>

<Navbar connectionUrl={data.url} bind:sectionsView={sectionsView} />

<div class="pt-32 bg-white z-20 h-32 w-full fixed"></div>

<div class="container mx-auto px-4 pt-32 z-10">
	<div class="flex flex-col mt-28 md:flex-row items-center justify-between">
		<div class="md:w-1/2">
			<div class=" mb-8 md:mb-0 w-2 w-4/5 mx-auto ">
				<h1 class="text-center font-normal text-4xl leading-tight mb-6">Découvrez {Messeys.NOM_APPLI}</h1>
				<div class="mx-auto w-1/4 my-8 h-[6px] rounded-2xl bg-secondary"></div>
				<p class="text-2xl font-normal" >{Messeys.SLOGAN}</p>
				<ul class="list-disc marker:text-secondary text-xl font-normal px-5 p-6">
					<li>{Messeys.VALEUR_1}</li>
					<li>{Messeys.VALEUR_2}</li>
					<li>{Messeys.VALEUR_3}</li>
				</ul>
				<button class="px-6 py-7">
					<a href="#"
					   class="px-6 py-3 bg-accent text-white font-medium rounded-full hover:bg-blue-700 transition duration-200">En savoir plus
					</a>
				</button>
			</div>

		</div>

		<div class="md:w-1/2">
			<img class="size-3/4" src="/header-chien.png" alt="image de chien"/>
		</div>
	</div>
<!--	<div style="height: 2000px" use:inview oninview_enter={() => {-->
<!--		changeSection('beasty')-->
<!--	}}>-->
<!--		{Messeys.NOM_APPLI}-->
<!--	</div>-->
</div>