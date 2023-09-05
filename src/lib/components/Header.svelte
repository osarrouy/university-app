<script>
	import { shorten } from '$lib/';
	import { Button } from '$lib/components';
	import { connected, signerAddress, web3Modal } from 'svelte-wagmi';

	const connect = () => {
		$web3Modal.openModal();
	};
</script>

<header class="padded">
	<h1>> ~ Rennes2 Dapp</h1>

	<Button on:click={connect}>
		{#if $connected}
			{shorten($signerAddress)}
		{:else}
			connect
		{/if}
	</Button>
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid $light-x;

		h1 {
			font-size: 1rem;
			position: relative;

			&:after {
				content: '';
				background-color: $accent;
				height: 1em;
				width: $space-sm;
				position: absolute;
				top: 0;
				right: -$space-md;
				animation: blink 1s step-end infinite;
				-webkit-animation: blink 1s step-end infinite;
			}
		}
	}

	@-webkit-keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
