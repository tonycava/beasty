<!-- ContactPage.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let formData = {
		firstName: '',
		lastName: '',
		email: '',
		subject: '',
		message: ''
	};

	const subjects = [
		"Question générale",
		"Support technique",
		"Partenariat",
		"Signalement",
		"Autre"
	];

	let isSubmitting = false;
	let submitStatus: { success: boolean; message: string } | null = null;

	const handleSubmit = async () => {
		try {
			isSubmitting = true;

			const formDataToSend = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				formDataToSend.append(key, value);
			});

			const response = await fetch('/contact', {
				method: 'POST',
				body: formDataToSend
			});

			if (response.ok) {
				submitStatus = { success: true, message: 'Message envoyé avec succès !' };
				formData = {
					firstName: '',
					lastName: '',
					email: '',
					subject: '',
					message: ''
				};
			} else {
				submitStatus = { success: false, message: 'Erreur lors de l\'envoi du message.' };
			}
		} catch (error) {
			submitStatus = { success: false, message: 'Erreur lors de l\'envoi du message.' };
		} finally {
			isSubmitting = false;
			setTimeout(() => {
				submitStatus = null;
			}, 5000);
		}
	};
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<div class="pt-32 bg-white z-20 h-32 w-full fixed"></div>

	<main class="flex-grow bg-white px-4 sm:px-6 lg:px-8 mt-32">
		<div class="max-w-2xl mx-auto">
			<h1 class="text-4xl font-bold text-center text-accent mb-6">Contactez-nous</h1>

			<div class="bg-[#FFF8ED] rounded-lg shadow-lg p-8">
				<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="firstName" class="block text-gray-700 mb-2">Prénom</label>
							<input
								type="text"
								id="firstName"
								bind:value={formData.firstName}
								class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-teal-500"
								placeholder="Prénom"
							/>
						</div>

						<div>
							<label for="lastName" class="block text-gray-700 mb-2">Nom</label>
							<input
								type="text"
								id="lastName"
								bind:value={formData.lastName}
								class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-teal-500"
								placeholder="Nom"
							/>
						</div>
					</div>

					<div>
						<label for="email" class="block text-gray-700 mb-2">Email</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-teal-500"
							placeholder="Email"
						/>
					</div>

					<div>
						<label for="subject" class="block text-gray-700 mb-2">Sujet</label>
						<select
							id="subject"
							bind:value={formData.subject}
							class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-teal-500"
						>
							<option value="" disabled selected>Sélectionnez un sujet</option>
							{#each subjects as subject}
								<option value={subject}>{subject}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="message" class="block text-gray-700 mb-2">Message</label>
						<textarea
							id="message"
							bind:value={formData.message}
							rows="6"
							class="w-full px-4 py-2 bg-white border-0 rounded-lg focus:ring-2 focus:ring-teal-500"
							placeholder="Votre message ici..."
						></textarea>
					</div>

					{#if submitStatus}
						<div
							class="fixed top-4 right-4 p-4 rounded-lg shadow-lg"
							class:bg-green-100={submitStatus.success}
							class:bg-red-100={!submitStatus.success}
						>
							<p class:text-green-700={submitStatus.success} class:text-red-700={!submitStatus.success}>
								{submitStatus.message}
							</p>
						</div>
					{/if}

					<button
						type="submit"
						class="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
					</button>
				</form>
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