<script>
	import { fetchBalance } from '@wagmi/core';
	import { connected, signerAddress } from 'svelte-wagmi';
	import { getNotificationsContext } from 'svelte-notifications';
	import { getContract } from 'viem';
	import { onMount } from 'svelte';
	import { shorten, ABI, ADDRESS } from '$lib';
	const { addNotification, clearNotifications } = getNotificationsContext();

	import { getPublicClient, getWalletClient } from '@wagmi/core';
	import { Button } from '$lib/components';
	import { sepolia } from '@wagmi/core/chains';

	let contract;
	let proposal = '';
	let proposals = [];
	let publicClient;
	let walletClient;

	const _initialize = async () => {
		console.log('» initializing contract ...');
		publicClient = getPublicClient();
		walletClient = await getWalletClient({ chainId: sepolia.id });

		if (walletClient) {
			contract = getContract({
				address: ADDRESS,
				abi: ABI,
				publicClient,
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

	const fetchProposals = async () => {
		let nbOfProposals = await contract.read.nbOfProposals();
		console.log('» fetching proposals ...');
		for (let i = proposals.length; i < nbOfProposals; i++) {
			const _proposal = await contract.read.getProposal([i]);
			const hasVoted = await contract.read.hasVoted([i, $signerAddress]);

			proposals = [
				...proposals,
				{ description: _proposal[2], yeahs: _proposal[3], neahs: _proposal[4], hasVoted }
			];
		}
		console.log('» proposals fetched.');
		console.log(proposals);
	};

	const propose = async () => {
		console.log('» Creating proposal « ' + proposal + ' » ...');
		try {
			addNotification({
				text: 'Validate tx in your wallet ...',
				position: 'bottom-center',
				type: 'error'
			});
			const hash = await contract.write.propose([proposal]);
			console.log(hash);
			clearNotifications();
			addNotification({
				text: 'Creating proposal through tx ' + shorten(hash) + '...',
				position: 'bottom-center'
			});
			const transaction = await publicClient.waitForTransactionReceipt({ hash });
			if (transaction.status !== 'success') throw new Error('Transaction failure');
			clearNotifications();
			addNotification({
				text: 'Proposal created.',
				position: 'bottom-center'
			});
			setTimeout(fetchProposals, 20000);
		} catch (e) {
			clearNotifications();
			addNotification({
				text: 'There has been an error ...',
				position: 'bottom-center',
				type: 'error'
			});
			await fetchProposals();
			console.log(e);
		}
	};

	const vote = async (id, yes) => {
		console.log('» Voting ' + yes + ' on proposal ' + id + ' ...');
		try {
			proposals[id].hasVoted = true;
			addNotification({
				text: 'Validate tx in your wallet ...',
				position: 'bottom-center',
				type: 'error'
			});
			const hash = await contract.write.vote([id, yes]);
			console.log(hash);
			clearNotifications();
			addNotification({
				text: 'Voting through tx ' + shorten(hash),
				position: 'bottom-center'
			});
			const transaction = await publicClient.waitForTransactionReceipt({ hash });
			if (transaction.status !== 'success') throw new Error('Transaction failure');
			clearNotifications();
			addNotification({
				text: 'Vote processed.',
				position: 'bottom-center'
			});
			setTimeout(fetchProposals, 20000);
		} catch (e) {
			proposals[id].hasVoted = false;
			clearNotifications();
			addNotification({
				text: 'There has been an error ...',
				position: 'bottom-center',
				type: 'error'
			});
			await fetchProposals();
			console.log(e);
		}
	};
</script>

<main class="padded">
	<p>> ~ <a href="/">go back</a></p>
	{#if $connected}
		<!-- <form>
			> ~ <input type="text" bind:value={proposal} placeholder="propose something" />
			<Button on:click={propose}>create proposal</Button>
		</form> -->
		<table>
			<tr><th>id</th><th>description</th><th>oui</th><th>non</th><th /><th /></tr>
			{#each proposals as _proposal, index}
				<tr
					><td>#{index}</td><td>{_proposal.description}</td><td>{_proposal.yeahs}</td><td
						>{_proposal.neahs}</td
					>
					{#if !_proposal.hasVoted}
						<td><Button on:click={() => vote(index, true)}>oui</Button></td>
						<td><Button on:click={() => vote(index, false)}>non</Button></td>
					{:else}
						<td />
						<td />
					{/if}
				</tr>
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

		tr {
			border-bottom: 1px solid $light-x;

			th {
				font-weight: bold;
			}
			th,
			td {
				padding: $space-sm;

				&:nth-of-type(1),
				&:nth-of-type(2) {
					text-align: left;
				}

				&:nth-of-type(3),
				&:nth-of-type(4) {
					text-align: right;
				}

				&:nth-of-type(5),
				&:nth-of-type(6) {
					display: inline-block;
				}

				&:nth-of-type(5) {
					margin-left: $space-lg;
				}

				&:nth-of-type(6) {
					margin-left: $space-lg;
				}
			}
		}
	}
</style>
