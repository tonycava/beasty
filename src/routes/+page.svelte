<script lang="ts">
	import type { PageServerData } from './$types';
	import { user } from '$auth/stores/UserStore';
	import { LogoutUseCase } from '$auth/usecases/LogoutUser';
	import Cookies from 'js-cookie';
    import { Messeys } from '$lib/utils/messages.utils';

	export let data: PageServerData;

	const disconnect = () => {
		LogoutUseCase({ cookieProvider: Cookies }).execute()
	}
</script>


{#if $user}
	You are login<br>
	{$user.firstName} {$user.lastName}<br>
	<button onclick={disconnect}>Disconnect</button>
{:else }
	<a href={data.url}>Connect with google</a>
{/if}

<div class="container mx-auto px-4">
	<div class="flex flex-col md:flex-row items-center justify-between">
		<div class="md:w-1/2">
			<div class=" mb-8 md:mb-0 w-2 w-4/5 mx-auto font-medium">
				<h1 class="text-center font-normal text-4xl leading-tight mb-6">Découvrez {Messeys.NOM_APPLI}</h1>
				<div class="mx-auto w-1/4 my-8 h-[6px] rounded-2xl bg-secondary"></div>
				<p class="text-2xl" >{Messeys.SLOGAN}</p>
				<ul class="list-disc marker:text-secondary">
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
</div>