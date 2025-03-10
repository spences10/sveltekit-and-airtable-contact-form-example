<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main
	class="prose-xl prose-a:link-primary container mx-auto mb-20 max-w-4xl px-4 text-xl"
>
	{@render children()}
</main>
