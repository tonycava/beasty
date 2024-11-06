<script lang="ts">
	import '../app.css';
	import { user } from '$auth/stores/UserStore';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: $user = data.user;
</script>

<slot />