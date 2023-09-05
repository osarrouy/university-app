<script>
	export let notification = {};
	export let onRemove = null;

	const close = () => {
		onRemove();
	};
</script>

<div class={notification.type === 'error' ? 'notification error' : 'notification'}>
	<p>> ~ {notification.text}</p>
	<div class="close" on:click={close} />
</div>

<style lang="scss">
	.notification {
		background-color: $light;
		border: 1px solid $light-x;
		border-radius: $radius;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: 0.8rem;
		margin: $space-md $space-md 0 0;
		padding: $space-md;

		.close {
			cursor: pointer;
			position: relative;
			height: $space-md;
			width: $space-md;
			margin-left: $space-sm;

			&:before,
			&:after {
				content: ' ';
				position: absolute;
				display: block;
				left: calc($space-md / 2);
				height: $space-md;
				width: 1px;
				background-color: $dark-x;
			}

			&:before {
				transform: rotate(45deg);
			}

			&:after {
				transform: rotate(-45deg);
			}

			&:hover {
				&:before,
				&:after {
					background-color: $accent;
				}
			}
		}
	}
</style>
