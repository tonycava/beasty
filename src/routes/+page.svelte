<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<a href={data.url}>Connect with google</a>