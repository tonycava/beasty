<script lang="ts">
	import type { PageServerData } from './$types';
	import { user } from '$auth/stores/UserStore';

	export let data: PageServerData;
</script>


{#if $user}
	You are login<br>
	{$user.firstName} {$user.lastName}
{:else }
	<a href={data.url}>Connect with google</a>
{/if}