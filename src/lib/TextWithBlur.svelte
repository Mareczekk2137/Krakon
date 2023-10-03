<script>
	export let text;
</script>

<div class="item w-full h-full relative">
	<div class="font-bold z-10 pointer-events-none text-sm ">
		{text}
	</div>
	<div
		class="bg-opacity-50 font-bold white-shadow bg-white text-sm text-white pointer-events-none"
	>
		{text}
	</div>
</div>

<style>
	.item > div {
		transition: opacity 0.2s ease;
		position: absolute;
	}
	.white-shadow {
		filter: blur(3px);
	}
</style>
