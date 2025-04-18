<script lang="ts">
	import { fade } from 'svelte/transition';
	import { selectedMatch } from './Messages.svelte.ts';
	import { user } from '$auth/stores/UserStore';
	import { focusOnMount } from '$lib/utils/utils.ts';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { MessageItem } from '../../modules/beasty/entities/Message.ts';
	import type { PageServerData } from './$types';
	import socket from '$lib/socket.ts';
	import { onMount } from 'svelte';

	let newMessage = $state('');
	let isLoading = $state(false);
	let messageContainer: HTMLDivElement | null = $state(null);
	let inputMessage: HTMLInputElement | null = $state(null);

	type PageProps = {
		data: PageServerData;
	}
	let { data }: PageProps = $props();
	let messages = $state<MessageItem[]>(data.messages);

	$effect(() => {
		messages = data.messages;
		scrollToBottom();
	});

	onMount(() => {
		socket.on('messageReceived', (message) => {
			console.log("Message reçu:", message);

			const messageExists = messages.some(m => m.id === message.id);

			if (!messageExists) {
				const messageWithDate = {
					...message,
					createdAt: new Date(message.createdAt)
				};

				messages = [...messages, messageWithDate];
				scrollToBottom();
			}
		});

		return () => {
			socket.off('messageReceived');
		};
	});

	function handleSubmit() {
		isLoading = true;
		return async ({ result }: { result: any }) => {
			await applyAction(result);

			if (result.type === 'success') {
				messages.push(result.data.message);

				socket.emit('messageSent', result.data.message);

				setTimeout(scrollToBottom, 0);
				newMessage = '';
			} else {
				console.error('Message sending failed:', result);
			}

			isLoading = false;
		};
	}

	function formatTime(date: Date | string) {
		try {
			const dateObj = typeof date === 'string' ? new Date(date) : date;

			if (!(true) || isNaN(dateObj.getTime())) {
				return 'Date invalide';
			}

			return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		} catch (error) {
			console.error('Erreur de formatage de date:', error, date);
			return 'Erreur date';
		}
	}

	function scrollToBottom() {
		if (!messageContainer || !inputMessage) return;
		messageContainer.scrollIntoView({ behavior: 'smooth' });
		inputMessage.focus();
	}
</script>

{#if $selectedMatch != null}

	<div class="flex-1 overflow-y-auto p-4 space-y-4">
		{#if data.messages.length !== 0}
			{#each messages as message (message.id)}
				{#if message && message.user && message.content}
					{@const isMe = message.user.id === $user?.id}
					<div
						class="flex items-end {isMe ? 'justify-end' : 'justify-start'} max-w-[80%] {isMe ? 'ml-auto' : 'mr-auto'}"
						transition:fade={{ duration: 150 }}
					>
						{#if !isMe}
							<div class="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
								<img src={message.user.profilePicture || "/placeholder.svg"}
										 alt={`${message.user.firstName} ${message.user.lastName}`}
										 class="w-full h-full object-cover" />
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
								<img src={$user.profilePicture || "/placeholder.svg"}
										 alt={`${$user?.firstName} ${$user?.lastName}`}
										 class="w-full h-full object-cover" />
							</div>
						{/if}
					</div>
				{/if}
			{/each}
			<div bind:this={messageContainer}></div>
		{:else}
			<div class="flex flex-col items-center justify-center h-full text-center py-10"
					 transition:fade={{ duration: 200 }}>
				<div class="w-16 h-16 bg-[#ffe4d6] rounded-full flex items-center justify-center mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
							 stroke="#ff9f63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-700 mb-2">Aucun message pour le moment</h3>
				<p class="text-gray-500 text-sm max-w-xs">
					Commencez la conversation avec {$selectedMatch?.animalMatched?.firstName || 'votre match'} en envoyant un
					message ci-dessous.
				</p>
				<div class="flex space-x-2 mt-6">
					<div class="w-2 h-2 bg-[#ff9f63] rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
					<div class="w-2 h-2 bg-[#ffdb78] rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
					<div class="w-2 h-2 bg-[#3b7080] rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
				</div>
			</div>
		{/if}

	</div>


	<div class="p-4 border-t border-gray-200 bg-white">
		<form
			class="flex"
			use:enhance={handleSubmit}
			enctype="multipart/form-data"
			method="POST"
			action="?/sendMessage&senderId={page.url.searchParams.get('senderId')}&receiverId={page.url.searchParams.get('receiverId')}&matchId={$selectedMatch?.id}"
		>
			<input
				use:focusOnMount
				autoComplete="off"
				type="text"
				name="content"
				disabled={isLoading}
				placeholder="Taper le message..."
				class="flex-1 p-3 border border-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#ff9f63] focus:border-[#ff9f63]"
				bind:value={newMessage}
				bind:this={inputMessage}
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
