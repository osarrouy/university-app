<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import '../app.scss';

	onMount(async () => {
		if (browser) {
			const { Buffer } = await import('buffer');
			window.Buffer = Buffer;
		}
	});
</script>

<slot />
