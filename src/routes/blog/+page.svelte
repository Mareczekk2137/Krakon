<script>
	import Card from '$lib/Card.svelte';
	export let data;

	let items = data.items;
</script>

<div
	class="grid py-8 grid grid-lg grid-md justify-center items-center gap-y-4 justify-items-center"
>
	{#each items as item, i}
		<div style="aspect-ratio: 3/2" class="lg:h-56 md:h-48 h-32">
			<Card delay={i * 100}>
				<div class="flex w-full h-full flex-col">
					<div class="h-4/5">
						<img src={item.icon} class="w-full h-full object-cover" />
					</div>
					<div class="h-1/5 text-center bg-gray-900 text-white">
						{item.title}
					</div>
				</div>
				<a href="/blog/{item.id}" class="absolute h-full w-full left-0 top-0"></a>
			</Card>
		</div>
	{/each}
</div>

<style>
	@media screen and (min-width: 1024px) {
		.grid-lg {
			grid-template-columns: repeat(auto-fit, 22rem);
		}
	}
	@media screen and (min-width: 768px) and (max-width: 1024px) {
		.grid-md {
			grid-template-columns: repeat(auto-fit, 18.7rem);
		}
	}
	@media screen and (max-width: 768px) {
		.grid {
			grid-template-columns: repeat(auto-fit, 12.5rem);
		}
	}
</style>
