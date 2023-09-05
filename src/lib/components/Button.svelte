<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const click = (ev) => {
		dispatch('click', ev);
	};
</script>

<button on:click={click}><slot /></button>

<style lang="scss">
	button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		background-color: $light;
		color: $accent;
		border: 1px solid $accent;
		border-radius: $radius;
		cursor: pointer;

		font-family: 'Supply Mono', monospace;
		font-size: 0.85rem;

		padding: $space-sm;
		transition: all 0.4s;
		user-select: none;
		touch-action: manipulation;
		-webkit-user-select: none;

		&:hover {
			background-color: $accent;
			color: $light;
		}

		&:active {
			transform: scale(0.95);
		}
	}
</style>
