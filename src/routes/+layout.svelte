<script>
	import '../app.css';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';


</script>
<svelte:head>
	<title>Krak-on</title>
	<link rel="manifest" href="/src/manifest.json" />
	<meta name="description" content="oficjalna strona Festiwalu Larpowego w Krakowie">
	<meta name="theme-color" content="#000000"/>
	<link rel="icon" href="/favicon.png" type="image/x-icon">

</svelte:head>
<div class="w-full dark:bg-gray-800 dark:text-gray-200 min-h-screen overflow-x-hidden">
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
