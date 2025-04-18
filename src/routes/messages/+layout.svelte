<script lang="ts">
	import { selectedMatch } from './Messages.svelte.ts';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { Match } from '../../modules/matcher/entities/Match.ts';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import socket from '$lib/socket.ts';
	import { user } from '$auth/stores/UserStore';

	let { data, children } = $props();
	let searchQuery = $state('');

	onMount(() => {
		if (data.matches && data.matches.length === 0) return;

		const matches = data.matches as Match[];

		const senderId = page.url.searchParams.get('senderId');
		const receiverId = page.url.searchParams.get('receiverId');
		if (!senderId || !receiverId) return;

		if (senderId && receiverId) {
			console.log('Joining chat room:', { senderId, receiverId });
			socket.emit('joinChat', { senderId, receiverId });
		}

		const index = matches.findIndex(match => match.animalInitiatorId === senderId && match.animalMatchedId === receiverId);
		if (index === -1) return;

		selectedMatch.set(matches[index]);
	});

	let filteredMatches = $derived.by(() => data.matches!.filter(match =>
		match.animalMatched.firstName.toLowerCase().includes(searchQuery.toLowerCase())
	));

	async function handleSelectMatch(match: Match) {
		const previousReceiverId = page.url.searchParams.get('receiverId');
		const previousSenderId = page.url.searchParams.get('senderId');

		const senderId = $user?.id;

		const receiverId = match.animalMatched.userId;

		console.log(`Navigating to messages with senderId: ${senderId}, receiverId: ${receiverId}, matchId: ${match.id}`);

		await goto(`/messages?receiverId=${receiverId}&senderId=${senderId}&matchId=${match.id}`);
		await invalidate('/messages');
		selectedMatch.set(match);
	}
</script>

<div class="fixed top-0 left-0 right-0 z-50">
	<Navbar />
    <div class="h-32 bg-white"></div>
</div>

<div class="flex h-screen bg-[#fff5ef] pt-32">
	<!-- Sidebar -->

	<div class="w-72 border-r border-gray-200 bg-white flex flex-col">
		<!-- Search bar -->
		<div class="p-4 border-b border-gray-200">
			<input
				type="text"
				placeholder="Rechercher match..."
				class="w-full p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff9f63] focus:border-[#ff9f63]"
				bind:value={searchQuery}
			/>
		</div>

		<!-- Contacts list or empty state -->
		<div class="flex-1 overflow-y-auto">
			{#if filteredMatches.length > 0}
				{#each filteredMatches as match (match.id)}
					<button
						type="button"
						class="flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors {$selectedMatch?.id === match.id ? 'bg-gray-100' : ''}"
						onclick={() => handleSelectMatch(match)}
						onkeydown={(event) => event.key === 'Enter' && handleSelectMatch(match)}
						aria-label={`Select match with ${match.animalMatched.firstName}`}
					>
						<div class="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
							<img
								src={match.animalMatched.images[0].url ? match.animalMatched.images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyoR4bhP5YMy5Fdiz8M7RVZMHyDkMvmJx4LQ&s'}
								alt={match.animalMatched.firstName || 'Match image'}
								class="w-full h-full object-cover"
							/>
						</div>
					
						<div class="ml-3 overflow-hidden">
							<div class="font-medium">{match.animalMatched.firstName}</div>
							<div class="text-sm text-gray-500 truncate">Continuer a discuter !</div>
						</div>
					</button>
				{/each}
			{:else}
				<!-- Empty state with style toggle -->
				<div class="p-4 text-center">

					<div class="flex flex-col items-center justify-center h-64 p-4">
						<div class="w-24 h-24 bg-[#ff9f63] opacity-20 rounded-full mb-4 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-[#ff9f63]" fill="none" viewBox="0 0 24 24"
									 stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-gray-800 mb-2">No matches found</h3>
						<p class="text-gray-500 text-sm text-center max-w-xs">
							We couldn't find any matches with that name. Try a different search or check back later.
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="flex-1 flex flex-col bg-gray-50">
		{#if !$selectedMatch && data.matches && data.matches.length > 0}
			<div class="flex items-center justify-center h-full text-gray-500">
				Select a conversation to start messaging
			</div>
		{:else if !data.matches || data.matches.length === 0}
			<div class="flex items-center justify-center h-full">
				<div class="text-center p-8 max-w-md">
					<div class="w-20 h-20 bg-[#ffdb78] opacity-30 rounded-full mx-auto mb-6 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#ff9f63]" fill="none" viewBox="0 0 24 24"
								 stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
						</svg>
					</div>
					<h2 class="text-xl font-bold text-gray-800 mb-2">Ancun match trouvé</h2>
					<p class="text-gray-600 mb-6">
						Looks like you haven't matched with anyone yet. Start swiping to find your perfect match!

					</p>
					<a href="/beastyMatcher"
						 class="inline-block bg-[#ff9f63] hover:bg-[#ff8c44] text-white font-medium py-2 px-6 rounded-full transition-colors">
						Start Matching
					</a>
				</div>
			</div>
		{:else}
			{@render children()}

		{/if}
	</div>
</div>

<Footer />

<style>
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
