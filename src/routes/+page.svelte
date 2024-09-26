<script>
	import { fetchBalance } from '@wagmi/core';
	import { connected, signerAddress } from 'svelte-wagmi';
	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	let fueled = false;

	connected.subscribe(async (_connected) => {
		if (!_connected) fueled = false;
	});

	signerAddress.subscribe(async (address) => {
		if (address) {
			const balance = await fetchBalance({ address });
			if (balance.value >= 50000000000000000n) fueled = true;
		}
	});

	const faucet = async () => {
		try {
			fetch('https://university-dapp.vercel.app/api/faucet?address=' + $signerAddress);
			addNotification({
				text: 'ETH on its way ...',
				position: 'bottom-center'
				// type: 'error',
			});
			fueled = true;
		} catch (error) {
			console.log(error);
		}
	};
</script>

<main class="padded">
	{#if $connected}
		{#if !fueled}
			<p>> ~ <a href="#" on:click={faucet}>claim ETH</a> or ...</p>
		{/if}
		<p>> ~ head to the <a href="/governance">governance page</a></p>
	{:else}
		<p>> ~ please, connect your wallet</p>
	{/if}
</main>

<style lang="scss">
	p {
		margin: $space-md 0;
	}
</style>
