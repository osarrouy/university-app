<script>
	import '../app.scss';
	import { PUBLIC_WALLETCONNECT_ID } from '$lib';
	import { Header, Notification, Spinner } from '$lib/components';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { mainnet, goerli } from '@wagmi/chains';
	import { loading, wagmiLoaded, defaultConfig } from 'svelte-wagmi';
	import Notifications from 'svelte-notifications';

	onMount(async () => {
		if (browser) {
			// fix SSR bug
			const { Buffer } = await import('buffer');
			window.Buffer = Buffer;

			// initialize app
			const app = defaultConfig({
				appName: 'Rennes2 Dapp',
				chains: [mainnet, goerli],
				walletConnectProjectId: PUBLIC_WALLETCONNECT_ID
			});
			await app.init();
		}
	});
</script>

<Notifications item={Notification}>
	{#if $loading || !$wagmiLoaded}
		<main><Spinner /></main>
	{:else}
		<Header />
		<slot />
	{/if}
</Notifications>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: calc(100vh - 2 * $space-md);
		padding: $space-md;
	}
</style>
