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
	import { shorten } from '$lib';
	import { fetchBalance } from '@wagmi/core';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	const PUBLIC_WALLETCONNECT_ID = '1286a6606e040f0620d01ee2465cb56a';
	let fueled = false;
	let balance;
	onMount(async () => {
		const erckit = defaultConfig({
			appName: 'erc.kit',
			chains: [mainnet, goerli],
			walletConnectProjectId: PUBLIC_WALLETCONNECT_ID
		});

		await erckit.init();
	});

	const connect = () => {
		$web3Modal.openModal();
	};

	connected.subscribe(async (connected) => {
		if (!connected) {
			fueled = false;
		}
	});

	signerAddress.subscribe(async (address) => {
		if (address) {
			balance = await fetchBalance({ address });
			if (balance.value >= 10000000000000000n) {
				fueled = true;
			}
		}
	});

	const faucet = async () => {
		try {
			fetch('https://university-dapp.vercel.app/api/faucet?address=' + $signerAddress);
			disabled = true;
			addNotification({
				text: 'ETH on its way ... Check your wallet in 30s',
				position: 'bottom-center'
			});
			fueled = true;
		} catch (error) {
			console.log(error);
		}
	};
</script>

<header>
	<h1>Rennes2 Dapp</h1>

	<Button on:click={() => connect()}>
		{#if $connected}
			{shorten($signerAddress)}
		{:else}
			connect your wallet
		{/if}
	</Button>
</header>
<main>
	{#if $connected}
		{#if !fueled}
			<Button on:click={faucet} disabled>claim ETH</Button>
			<p>or</p>
		{/if}
		<Button on:click={() => connect()}>go to votes</Button>
	{:else}
		<p>please, connect you wallet</p>
	{/if}
</main>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: $space-md;
		max-width: 980px;
		margin: auto;
		border-bottom: 1px solid $dark;
		h1 {
			font-size: 1rem;
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
