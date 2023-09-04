<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Notifications from 'svelte-notifications';
	import '../app.scss';

	onMount(async () => {
		if (browser) {
			const { Buffer } = await import('buffer');
			window.Buffer = Buffer;
		}
	});
</script>

<Notifications>
	<slot />
</Notifications>
