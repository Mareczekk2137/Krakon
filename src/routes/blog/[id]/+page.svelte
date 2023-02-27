<script>
	export let data;

	//    <img src="http://139.144.177.113/api/files/quuy76fphxodphj/{data.id}/{data.icon}" class="w-full h-64 object-scale-down" >
</script>

<div class="py-8 flex flex-row">
	<div style="width: calc(100% - 8rem)">
		<h1 class="text-2xl font-extrabold ">{data.title}</h1>
		<p class="my-2">{data.text}</p>
	</div>
	<div class="pl-4 w-40">
		<h1 class="text-sm font-extrabold ">Autorzy:</h1>
		{#each data.expand.author as author}
			<p class="mt-2 text-xs">- {author.imie} {author.nazwisko}</p>
		{/each}
	</div>
</div>

<style>
</style>
