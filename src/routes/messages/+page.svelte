<script lang="ts">
	import { fade } from 'svelte/transition';
	import { selectedContact } from './Messages.svelte.ts';
	import { user } from '$auth/stores/UserStore';
	import { focusOnMount } from '$lib/utils/utils.ts';
	import { applyAction, enhance } from '$app/forms';

	let newMessage = $state('');
	let isLoading = $state(false);
	let messageContainer: HTMLDivElement | null = $state(null);

	let { data } = $props();
	let messages = $state(data.messages);

	function handleSubmit() {
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);

			messages = [...messages, result.data.message];
			scrollToBottom();
			newMessage = '';
			isLoading = false;
		};
	}

	function formatTime(date: Date) {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function scrollToBottom() {
		if (messageContainer) {
			messageContainer.scrollTop = messageContainer.scrollHeight;
		}
	}

</script>

{#if $selectedContact}

	<div class="flex items-center p-4 border-b border-gray-200 bg-white">
		<div class="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
			<img src={$selectedContact.avatar || "/placeholder.svg"} alt={$selectedContact.name}
					 class="w-full h-full object-cover" />
			{#if $selectedContact.isOnline}
						<span
							class="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-1.5 border-white"></span>
			{/if}
		</div>
		<div class="ml-3">
			<div class="font-medium">{$selectedContact.name}</div>
			<div class="text-sm text-gray-500">
				{$selectedContact.isOnline ? 'En ligne' : 'Hors ligne'}
			</div>
		</div>
	</div>

	<div class="flex-1 overflow-y-auto p-4 space-y-4" bind:this={messageContainer}>
		{#if messages.length !== 0}
			{#each messages as message (message.id)}
				{@const isMe = message.senderId === $user?.id}
				<div
					class="flex items-end {isMe ? 'justify-end' : 'justify-start'} max-w-[80%] {isMe ? 'ml-auto' : 'mr-auto'}"
					transition:fade={{ duration: 150 }}
				>
					{#if !isMe}
						<div class="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
							<img src={$selectedContact.avatar} alt={`${$selectedContact.firstName} ${$selectedContact.lastName}`} class="w-full h-full object-cover" />
						</div>
					{/if}

					<div class="flex flex-col">
						<div
							class="{isMe ? 'bg-[#3b7080] text-white rounded-tr-none' : 'bg-white border border-gray-200 rounded-tl-none'} p-3 rounded-2xl max-w-full break-words">
							{message.content}
						</div>

						<div
							class="text-xs text-gray-500 mt-1 {isMe ? 'text-right' : 'text-left'}">
							{formatTime(message.createdAt)}
						</div>
					</div>

					{#if isMe}
						<div class="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0">
							<img src={$user.profilePicture} alt={`${message.user.firstName} ${message.user.lastName}`}
									 class="w-full h-full object-cover" />
						</div>
					{/if}
				</div>
			{/each}
		{:else}
			<p>Aucun message pour le moment</p>
		{/if}

	</div>

	<!-- Message input -->
	<div class="p-4 border-t border-gray-200 bg-white">
		<form
			class="flex"
			use:enhance={handleSubmit}
			enctype="multipart/form-data"
			method="POST"
			action="?/sendMessage"
		>
			<input
				use:focusOnMount
				type="text"
				name="content"
				disabled={isLoading}
				placeholder="Taper le message..."
				class="flex-1 p-3 border border-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#ff9f63] focus:border-[#ff9f63]"
				bind:value={newMessage}
			/>
			<input hidden name="selectedContactId" value="5be4ff39-60bc-48f8-9ec5-2a2dd1542281" />
			<button
				disabled={isLoading}
				aria-label="Send"
				type="submit"
				class="flex items-center justify-center w-12 bg-[#ff9f63] text-white rounded-r-full hover:bg-[#ffdb78] hover:text-[#3b7080] transition-colors"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
						 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="22" y1="2" x2="11" y2="13"></line>
					<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
				</svg>
			</button>
		</form>
	</div>
{:else}
	<!-- No contact selected state -->
	<div class="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
		<div class="w-24 h-24 mb-6">
			<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M50 87.5C70.7107 87.5 87.5 70.7107 87.5 50C87.5 29.2893 70.7107 12.5 50 12.5C29.2893 12.5 12.5 29.2893 12.5 50C12.5 70.7107 29.2893 87.5 50 87.5Z"
					fill="#FFE4D6" />
				<path
					d="M65 40C65 48.2843 58.2843 55 50 55C41.7157 55 35 48.2843 35 40C35 31.7157 41.7157 25 50 25C58.2843 25 65 31.7157 65 40Z"
					fill="#FF9F63" />
				<path d="M80 82.5C80 65.6294 66.5685 52 50 52C33.4315 52 20 65.6294 20 82.5" stroke="#FF9F63"
							stroke-width="5" />
			</svg>
		</div>
		<h2 class="text-xl font-semibold text-gray-700 mb-2">Bienvenue sur Beasty Chat</h2>
		<p class="text-gray-500 mb-6 max-w-md">
			Sélectionnez un contact dans la liste pour commencer une conversation
		</p>
		<div class="flex space-x-2">
			<div class="w-3 h-3 bg-[#ff9f63] rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
			<div class="w-3 h-3 bg-[#ffdb78] rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
			<div class="w-3 h-3 bg-[#3b7080] rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
		</div>
	</div>
{/if}
