<script>
	import ImageView from '$lib/ImageView.svelte';
</script>

<div class="w-64 h-32">
	<ImageView>
		{#each Array(4) as e}
			<div class="h-full">
				<img
					src="http://139.144.177.113/api/files/5yxskt98ol0e425/{'e.id'}/{'e.icon'}"
					class="w-full h-full object-cover"
				/>
				<span class="bottom-0 right-0 absolute mr-2 text-white font-bold">
					{'e.name'}
				</span>
				<a href="#{'e.id'}" class="absolute left-0 top-0 w-full h-full"></a>
			</div>
		{/each}
	</ImageView>
</div>
