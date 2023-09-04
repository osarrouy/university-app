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
		border: 1px solid $dark;
		border-radius: $radius;
		font-size: 1rem;
		color: $dark;
		cursor: pointer;
		font-family: 'Supply Mono', monospace;
		padding: $space-sm;
		transition: all 0.3s;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;

		&:focus {
			color: #171e29;
		}

		&:hover {
			border-color: $accent;
			color: $accent;
			fill: $accent;
		}

		&:active {
			border-color: $accent;
			color: $accent;
			fill: $accent;
		}
	}

	@media (min-width: 768px) {
		button {
			min-width: 170px;
		}
	}
</style>
