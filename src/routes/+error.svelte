<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	const circles = Array.from({ length: 50 }, () => ({
		size: Math.random() * 20 + 5,
		left: Math.random() * 100,
		top: Math.random() * 100,
		duration: Math.random() * 3 + 2,
		delay: Math.random() * 5
	}));
</script>

<svelte:head>
	<title>404 - Page Not Found</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
	<div class="absolute inset-0 z-0">
		{#each circles as circle}
			<div
				class="absolute rounded-full bg-gray-100 animate-float"
				style="
          width: {circle.size}px;
          height: {circle.size}px;
          left: {circle.left}%;
          top: {circle.top}%;
          --duration: {circle.duration}s;
          --delay: {circle.delay}s;
        "
			>
			</div>
		{/each}
	</div>

	<div class="relative z-10 text-center px-8">
		{#if mounted}
			<h1 in:fly={{ y: -50, duration: 500, delay: 200 }} out:fade class="text-8xl font-bold text-accent-dark mb-4">
				404
			</h1>
			<p
				in:fly={{ y: 50, duration: 500, delay: 400 }}
				out:fade
				class="text-2xl text-accent-dark mb-8"
			>
				Oops! La page n'a pas été trouvée.
			</p>

			<a href="/"
			in:fly={{ y: 50, duration: 500, delay: 600 }}
			out:fade
			class="inline-block bg-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary-light transition-colors duration-300"
			>
			Revenir en lieu sûr
			</a>
		{/if}
	</div>
</div>

<style>
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-20px) translateX(5px);
            opacity: 1;
        }
    }

    .animate-float {
        animation: float var(--duration) ease-in-out infinite;
        animation-delay: var(--delay);
    }

    :global(html, body) {
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>