<script>
	import Logo from '$lib/Logo.svelte';
</script>

<header
	class="bg-white shadow-gray-100 dark:shadow-black dark:bg-gray-900 fixed inset-x-0 h-16 justify-center sm:justify-start flex content-center items-center font-bold shadow-md top-0 z-50 lg:px-10 sm:px-10 gap-8 md:gap-8 lg:gap-8"
>
	<a href="/" class="h-12 hover:scale-90">
		<Logo />
	</a>
	<div class="flex gap-x-4 md:gap-x-8 ">
		<div class="flex gap-x-4 md:gap-x-8 flex-col sm:flex-row">
			<a href="/harmonogram" class="u_hover_sparkle flex-1"> harmnogram </a>
			<a href="/wazne" class="u_hover_sparkle inline-block"> ważne </a>
		</div>
		<div class="flex gap-x-4 md:gap-x-8 flex-col sm:flex-row">
			<!--<a href="/blog" class="u_hover_sparkle"> blog </a>-->
			<a href="/organizatorzy" class="u_hover_sparkle"> organizatorzy </a>
		</div>
	</div>
</header>

<style>
	@media (prefers-color-scheme: dark) {
		.u_hover_sparkle::after {
			border-bottom: 0.125em solid rgb(229 231 235);
			transform: scale3d(0, 1, 1);
		}
	}
	@media (prefers-color-scheme: light) {
		.u_hover_sparkle::after {
			border-bottom: 0.125em solid black;
			transform: scale3d(0, 1, 1);
		}
	}
	.u_hover_sparkle {
		box-sizing: border-box;
		position: relative;
	}
	.u_hover_sparkle::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		transform-origin: center;
	}
	.u_hover_sparkle:hover::after {
		transform: scale3d(1, 1, 1);
		transition: transform 700ms;
	}
</style>
