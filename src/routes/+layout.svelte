<script>
	import '../app.css';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { onMount } from "svelte";


	onMount(()=>{
		let script = document.createElement('script');
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBSYXYeDJp80BzZozHpcLng2g3GZQCgmPY&callback=initMap&v=weekly';
		document.head.appendChild(script);
	})
</script>

<div class="w-full dark:bg-gray-800 dark:text-gray-200 min-h-screen">
	<Header />

	<main class="pt-16 main">
		<slot />
	</main>

	<Footer />
</div>

<style>
	.main {
		padding-left: 2%;
		padding-right: 2%;
	}

	@media screen and (min-width: 800px) {
		.main {
			padding-left: 8%;
			padding-right: 8%;
		}
	}
</style>
