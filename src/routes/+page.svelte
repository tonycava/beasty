<script lang="ts">
	import type { PageServerData } from './$types';
	import { user } from '$auth/stores/UserStore';
	import { LogoutUseCase } from '$auth/usecases/LogoutUser';
	import Cookies from 'js-cookie';

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