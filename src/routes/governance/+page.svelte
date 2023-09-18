<script>
	import { fetchBalance } from '@wagmi/core';
	import { connected, signerAddress } from 'svelte-wagmi';
	import { getNotificationsContext } from 'svelte-notifications';
	import { getContract } from 'viem';
	import { onMount } from 'svelte';
	import { shorten, ABI, ADDRESS } from '$lib';
	const { addNotification } = getNotificationsContext();
	import { getPublicClient, getWalletClient } from '@wagmi/core';
	import { Button } from '$lib/components';
	import { sepolia } from '@wagmi/core/chains';

	let contract;
	let proposal = '';
	let proposals = [];

	const _initialize = async () => {
		console.log('» initializing contract ...');
		const walletClient = await getWalletClient({ chainId: sepolia.id });

		if (walletClient) {
			contract = getContract({
				address: ADDRESS,
				abi: ABI,
				publicClient: getPublicClient(),
				walletClient
			});
			console.log('» contract initialized.');
			fetchProposals();
		} else setTimeout(_initialize, 1000);
	};

	connected.subscribe(async (_connected) => {
		if (_connected) await _initialize();
		else contract = undefined;
	});

	// onMount(async () => {
	// 	setTimeout(fetchProposals, 1000);
	// });

	const fetchProposals = async () => {
		let nbOfProposals = await contract.read.nbOfProposals();
		console.log('fetch ' + nbOfProposals);

		for (let i = proposals.length; i < nbOfProposals; i++) {
			const _proposal = await contract.read.getProposal([i]);
			proposals = [
				...proposals,
				{ description: _proposal[2], yeahs: _proposal[3], neahs: _proposal[4] }
			];
		}
	};

	const propose = async () => {
		console.log('» Creating proposal « ' + proposal + ' » ...');
		try {
			const hash = await contract.write.propose([proposal]);
			console.log(hash);
			addNotification({
				text: 'Creating proposal through tx ' + shorten(hash) + '...',
				position: 'bottom-center'
			});
		} catch (e) {
			addNotification({
				text: 'There has been an error ...',
				position: 'bottom-center',
				type: 'error'
			});
			console.log(e);
		}
	};
</script>

<main class="padded">
	{#if $connected}
		<p>> ~ <a href="/">go back</a></p>
		<form>
			> ~ <input type="text" bind:value={proposal} placeholder="propose something" />
			<Button on:click={propose}>create proposal</Button>
		</form>

		<table>
			<tr><th>id</th><th>description</th><th>oui</th><th>non</th></tr>
			{#each proposals as _proposal, index}
				<tr
					><td>#{index}</td><td>{_proposal.description}</td><td>{_proposal.yeahs}</td><td
						>{_proposal.neahs}</td
					></tr
				>
			{/each}
		</table>
	{:else}
		<p>> ~ please, connect your wallet</p>
	{/if}
</main>

<style lang="scss">
	p {
		margin: $space-md 0;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		input {
			margin: 0 0.5em;
		}
	}

	table {
		width: 100%;
	}
</style>
