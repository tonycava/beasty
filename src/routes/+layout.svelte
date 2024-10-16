<script lang="ts">
	import '../index.css';

	import { user } from '$auth/stores/UserStore';

	export let data;

	$: user.set(data.user);
</script>

<slot />