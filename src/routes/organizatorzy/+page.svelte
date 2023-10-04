<script>
	import { fly } from 'svelte/transition';

	export let data;
</script>

<div
	style="grid-template-columns: repeat(auto-fit, minmax(0, 28rem));"
	class="grid justify-items-center justify-center gap-y-16"
>
	{#each data.items as user, i}
		<div class="flex flex-col items-center max-w-[24rem]">
			<img
				in:fly={{ y: 10, duration: 700, delay: i * 100 }}
				class="object-cover w-32 h-48"
				src={user.avatar}
			/>
			<p class="py-2 text-center italic">
				{user.imie + ' ' + user.nazwisko}
			</p>
			<p class=" text-center text-xs">
				{user.opis}
			</p>
		</div>
	{/each}
</div>

<style>
</style>
