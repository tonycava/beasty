<script lang="ts">
	import AnimalModal from '$lib/components/layout/AnimalModal.svelte';


	let isAnimalModalOpen = $state(true);


	function closeAnimalModal() {
		isAnimalModalOpen = false;
	}
</script>

<AnimalModal
	bind:isOpen={isAnimalModalOpen}
	on:close={() => null}
	canClose={false}
/>
