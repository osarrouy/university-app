<script>
	import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
	import { Web3Modal } from '@web3modal/html';
	import { configureChains, createConfig } from '@wagmi/core';
	import { arbitrum, mainnet, polygon } from '@wagmi/core/chains';
	import { onMount } from 'svelte';

	onMount(() => {
		const chains = [arbitrum, mainnet, polygon];
		const projectId = '1286a6606e040f0620d01ee2465cb56a';

		const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
		const wagmiConfig = createConfig({
			autoConnect: true,
			connectors: w3mConnectors({ projectId, chains }),
			publicClient
		});
		const ethereumClient = new EthereumClient(wagmiConfig, chains);
		const web3modal = new Web3Modal({ projectId }, ethereumClient);
	});
</script>

<main>
	<w3m-core-button />
</main>

<style lang="scss">
</style>
