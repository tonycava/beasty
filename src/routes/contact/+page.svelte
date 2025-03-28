<script lang="ts">
	import { enhance } from '$app/forms';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let formLoading = false;

	function handleSubmit() {
		formLoading = true;
		return async ({ result, update }) => {
			if (result.type === 'success') {
				const form = document.querySelector('form');
				form?.reset();
			}
			await update();
			formLoading = false;
		};
	}
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<div class="pt-32 bg-white z-20 h-32 w-full fixed"></div>

	<main class="flex-grow bg-white px-4 sm:px-6 lg:px-8 mt-32">
		<div class="max-w-2xl mx-auto">
			<h1 class="text-4xl font-bold text-center text-accent mb-6">Contactez-nous</h1>

			<div class="bg-[#FFF8ED] rounded-lg shadow-lg p-8">
				{#if formLoading}
					<div class="text-center py-8">
						<div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
						<p class="mt-2 text-accent">Envoi en cours...</p>
					</div>
				{:else}
					<form
						method="POST"
						class="space-y-6"
						use:enhance={handleSubmit}
					>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label for="firstName" class="block text-gray-700 mb-2">Prénom</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									required
									class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-accent-light"
									placeholder="Prénom"
									disabled={formLoading}
								/>
							</div>

							<div>
								<label for="lastName" class="block text-gray-700 mb-2">Nom</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									required
									class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-accent-light"
									placeholder="Nom"
									disabled={formLoading}
								/>
							</div>
						</div>

						<div>
							<label for="email" class="block text-gray-700 mb-2">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-accent-light"
								placeholder="Email"
								disabled={formLoading}
							/>
						</div>

						<div>
							<label for="subject" class="block text-gray-700 mb-2">Sujet</label>
							<select
								id="subject"
								name="subject"
								required
								class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-accent-light"
								disabled={formLoading}
							>
								<option value="" disabled selected>Sélectionnez un sujet</option>
								<option value="Question générale">Question générale</option>
								<option value="Support technique">Support technique</option>
								<option value="Partenariat">Partenariat</option>
								<option value="Signalement">Signalement</option>
								<option value="Autre">Autre</option>
							</select>
						</div>

						<div>
							<label for="message" class="block text-gray-700 mb-2">Message</label>
							<textarea
								id="message"
								name="message"
								required
								rows="6"
								class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-accent-light"
								placeholder="Votre message ici..."
								disabled={formLoading}
							></textarea>
						</div>

						<button
							type="submit"
							class="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={formLoading}
						>
							{formLoading ? 'Envoi en cours...' : 'Envoyer le message'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</main>

	<Footer />
</div>

<style>
    input::placeholder,
    textarea::placeholder {
        color: #9CA3AF;
    }
</style>