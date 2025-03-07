<script lang="ts">
	import { type Contact, selectedContact } from './Messages.svelte.ts';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let { data, children } = $props();

	let searchQuery = $state('');

	onMount(() => {
		if (data.contacts.length === 0) return;

		const contactId = page.url.searchParams.get("id");
		const index = data.contacts.findIndex(contact => contact.id === contactId);
		if (index === -1) return;

		selectedContact.set(data.contacts[index]);
	})

	let filteredContacts = $derived.by(() => data.contacts.filter(contact =>
		contact.name.toLowerCase().includes(searchQuery.toLowerCase())
	));

	async function handleSelectContact(contact: Contact) {
		await goto("/messages?id=" + contact.id);
		await invalidate('/messages');
		selectedContact.set(contact);
	}

</script>

<div class="flex h-screen bg-[#fff5ef]">
	<!-- Sidebar -->
	<div class="w-72 border-r border-gray-200 bg-white flex flex-col">
		<!-- Search bar -->
		<div class="p-4 border-b border-gray-200">
			<input
				type="text"
				placeholder="Rechercher contact..."
				class="w-full p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff9f63] focus:border-[#ff9f63]"
				bind:value={searchQuery}
			/>
		</div>

		<!-- Contacts list -->
		<div class="flex-1 overflow-y-auto">
			{#each filteredContacts as contact (contact.id)}
				<div
					class="flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors {$selectedContact?.id === contact.id ? 'bg-gray-100' : ''}"
					onclick={() => handleSelectContact(contact)}
				>
					<div class="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
						<img src={contact.avatar || "/placeholder.svg"} alt={contact.name} class="w-full h-full object-cover" />
						{#if contact.isOnline}
							<span
								class="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-1.5 border-white"></span>
						{/if}
					</div>
					<div class="ml-3 overflow-hidden">
						<div class="font-medium">{contact.name}</div>
						<div class="text-sm text-gray-500 truncate">{contact.lastMessage}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex-1 flex flex-col bg-gray-50">
		{@render children()}
	</div>

</div>

<style global>
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #ff9f63;
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #ffdb78;
    }

    /* Animation for dots */
    @keyframes bounce {
        0%, 80%, 100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
    }

    :global(.animate-bounce) {
        animation: bounce 1.4s infinite ease-in-out;
    }
</style>
