<script lang="ts">
	async function checkout() {

		const data: any = await fetch("/api/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				items: [],
			}),
		}).then((data) => data.json());

	}
</script>

<button on:click={checkout}>Checkout</button>
