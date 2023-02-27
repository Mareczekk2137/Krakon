<script>
	import { onMount } from 'svelte';
	let map;

	const initMap = () => {
		map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: 50.05769098118801, lng: 19.94914294496834 },
			zoom: 14
		});
	}

	onMount(() => {
		let scriptUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBSYXYeDJp80BzZozHpcLng2g3GZQCgmPY&callback=initMap&v=weekly';
		let scriptExists = document.querySelector('script[src="' + scriptUrl + '"]');
		if(!scriptExists){
			let script = document.createElement('script');
			script.src = scriptUrl;
			document.head.appendChild(script);
		}else {
			initMap()
		}
		window.initMap = initMap;
	});
</script>

<div class="mt-8">
	<div class="text-2xl font-extrabold">Dojazd:</div>
	<p>larpy odbywają sie w Krakowie na ulicy ........</p>
	<div id="map" style="height: 32rem" class="w-full"></div>
</div>
