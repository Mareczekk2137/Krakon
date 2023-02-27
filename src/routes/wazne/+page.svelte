<script>
	import { onMount } from 'svelte';
	let map;

	onMount(() => {
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				center: { lat: 50.05769098118801, lng: 19.94914294496834 },
				zoom: 14
			});
		}

		window.initMap = initMap;
	});
</script>

<svelte:head>
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSYXYeDJp80BzZozHpcLng2g3GZQCgmPY&callback=initMap&v=weekly"
		defer
	>
	</script>
</svelte:head>
<div class="mt-8">
	<div class="text-2xl font-extrabold">Dojazd:</div>
	<p>larpy odbywają sie w Krakowie na ulicy ........</p>
	<div id="map" style="height: 32rem" class="w-full"></div>
</div>
