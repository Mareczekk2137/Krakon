<script>
	import { fly } from 'svelte/transition';

	export let delay = 0;
	let card;
	let style = '';
	function rotateToMouse(e) {
		const bounds = card.getBoundingClientRect();
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		const leftX = mouseX - bounds.x;
		const topY = mouseY - bounds.y;
		const center = {
			x: leftX - bounds.width / 2,
			y: topY - bounds.height / 2
		};
		const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

		style = `transform: scale3d(1.07, 1.07, 1.07)
        rotate3d(${center.y / 100},${-center.x / 100},0,${Math.log(distance) * 0.05}deg );
        z-index: 25;
        `;
	}
	function normalize() {
		style = '';
	}
</script>

<div
	in:fly={{ y: 5, duration: 300, delay: delay }}
	class="w-full h-full z-10 hover:z-20"
	style="perspective: 150px"
>
	<div
		bind:this={card}
		on:mousemove={rotateToMouse}
		on:mouseleave={normalize}
		{style}
		class="card"
	>
		<slot />
	</div>
</div>

<style>
	.card {
		font-weight: bold;
		text-align: right;
		color: #181a1a;

		width: 100%;
		height: 100%;
		box-shadow: 0 1px 5px #00000099;

		border-radius: 10px;

		position: relative;

		transition-duration: 300ms;
		transition-property: transform, box-shadow;
		transition-timing-function: ease-out;
	}

	.card:hover {
		transition-duration: 150ms;
		box-shadow: 0 5px 20px 5px #00000044;
	}
</style>
