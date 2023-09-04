<script>
	import {
		connected,
		web3Modal,
		loading,
		signerAddress,
		wagmiLoaded,
		chainId,
		defaultConfig
	} from 'svelte-wagmi';
	import { mainnet, goerli } from '@wagmi/chains';
	import { onMount } from 'svelte';

	import { Button } from '$lib/components';

	const PUBLIC_WALLETCONNECT_ID = '1286a6606e040f0620d01ee2465cb56a';

	onMount(async () => {
		const erckit = defaultConfig({
			appName: 'erc.kit',
			chains: [mainnet, goerli],
			walletConnectProjectId: PUBLIC_WALLETCONNECT_ID
		});

		await erckit.init();
	});

	// const connect = async () => {
	// 	const provider = await web3Modal.connect();
	// 	console.log(provider);
	// };

	const connect = () => {
		$web3Modal.openModal();
	};
</script>

<header>
	<h1>Rennes2 Dapp</h1>

	<Button on:click={() => connect()}>
		{#if $connected}
			{$signerAddress}
		{:else}
			connect your wallet
		{/if}
	</Button>
</header>
<main>
	{#if $connected}
		<Button on:click={() => connect()}>claim ETH</Button>
		<p>or</p>
		<Button on:click={() => connect()}>go to dashboard</Button>
	{/if}
</main>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: $space-md;
		h1 {
			font-size: 1.6rem;
			font-weight: 600;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-top: $space-md;
		padding: $space-md;

		p {
			margin: $space-md 0;
		}
	}
</style>
