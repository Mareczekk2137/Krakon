<script>
	import { fly } from 'svelte/transition';

	export let data;
</script>

<div
	style="grid-template-columns: repeat(auto-fit, 13.5rem);"
	class="mt-8 grid justify-items-center justify-center"
>
	{#each data.items as user, i}
		<div class="flex flex-col w-52 items-center">
			<img
				in:fly={{ y: 10, duration: 700, delay: i * 100 }}
				class="object-cover w-32 h-48"
				src={user.avatar}
			/>
			<pc class="pt-2 h-8 text-center italic">
				{user.imie + ' ' + user.nazwisko}
			</pc>
			<p class=" pt-4 text-center text-sm ">
				{user.opis}
			</p>
		</div>
	{/each}
</div>

<style>
</style>
