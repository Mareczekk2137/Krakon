<script>
	import Card from '$lib/Card.svelte';
	import TextWithBlur from '$lib/TextWithBlur.svelte';
	import Anchor from '$lib/Anchor.svelte';
	import { Vector2 } from 'three';

	export let data;

	let times = [];
	let timeRange = new Vector2(8, 24);
	let timeCount = timeRange.y - timeRange.x;
	for (let i = timeRange.x; i <= timeRange.y; i += 2) {
		times.push(String(i) + ':00');
	}
	let dayToString = {
		1: 'Poniedzialek',
		2: 'Wtorek',
		3: 'Sroda',
		4: 'Czwartek',
		5: 'Piatek',
		6: 'Sobota',
		0: 'Niedziela'
	};
	let dayToEvent = {};
	console.log(data.events);

	function dateToHours(date) {
		return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600 - timeRange.x - 1;
	}

	data.days.forEach((day) => {
		dayToEvent[day] = [];
	});

	data.events.forEach((v) => {
		let date = new Date(v.date);
		let dateEnd = new Date(v.dateEnd);
		let day = date.getDay();

		v.top = (100 / timeCount) * dateToHours(date);
		v.height = (100 / timeCount) * (dateToHours(dateEnd) - dateToHours(date));
		dayToEvent[day].push(v);
	});
	for (let [_, events] of Object.entries(dayToEvent)) {
		console.log(events);
		events.forEach((v) => {
			let overlapping = [v];
			let bottomOverlapping = [v];
			let topOverlapping = [v];
			events.forEach((ev) => {
				if (ev === v) {
					return;
				}
				if (ev.top <= v.top + v.height && v.top + v.height < ev.top + ev.height) {
					console.log('are overlapping');
					overlapping.push(ev);
					bottomOverlapping.push(ev);
				}
				if (ev.top <= v.top && v.top < ev.top + ev.height) {
					console.log('are overlapping');
					overlapping.push(ev);
					topOverlapping.push(ev);
				}
			});
			v.overlapping = overlapping;
			v.topOverlapping = topOverlapping;
			v.bottomOverlapping = bottomOverlapping;
		});

		let leftSet = [];
		events.forEach((v) => {
			let columns = Math.max(v.topOverlapping.length, v.bottomOverlapping.length);
			console.log(columns);
			let width = 100 / columns;
			let overlappingWithLeftSet = 0;
			leftSet.forEach((ev) => {
				if (v.overlapping.indexOf(ev) !== -1) {
					overlappingWithLeftSet += 1;
				}
			});
			v.left = width * overlappingWithLeftSet;
			v.width = width;
			leftSet.push(v);
		});
	}

	let regexUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)
	function makeLinksWork(someText) {
		let urls = someText.match(regexUrl)
		if (!urls){return someText}
		console.log(urls)
		urls.forEach((url) => {
			someText = someText.replace(url, '<a href="'+url+'" target="_blank">'+url+'</a>')
		})
		return someText
	}
	//style="aspect-ratio: 1 / .3"
</script>

<div class="w-full h-full text-center ">
	<div class="flex flex-col justify-center gap-y-16">
		{#each data.days as day}
			<div class=" w-full flex flex-row relative h-64 md:h-96">
				{#each times as time, i}
					<div
						style="top: calc({i} * (100% - 2rem) / {times.length - 1} + 1.375rem)"
						class="absolute text-sm text-right w-12 flex items-center"
					>
						{time}
					</div>
				{/each}

				<div
					class="w-full md:h-96 border-x border-blue-300 dark:border-blue-900  ml-14 lg:mr-14 relative"
				>
					<div class="w-full h-full flex flex-row">
						{#each times as time, i}
							<div
								style="left: -0.5rem; top: calc({i} * (100% - 2rem) / {times.length -
								1} + 2rem - 0.1rem); height: 0.1rem; width: calc(100% + 0.5rem)"
								class="bg-blue-100 dark:bg-blue-300 absolute flex items-center "
							/>
						{/each}

						<div
							style:width="{100}%"
							class=" flex flex-col border-x border-blue-300 dark:border-blue-900 relative"
						>
							<div
								style="height: {2}rem;"
								class="gradient w-full border-b-2 border-blue-300 dark:border-blue-900 flex justify-center items-center font-extrabold"
							>
								{dayToString[day]}
							</div>
							<div style:height="calc(100% - 2rem)" class="w-full relative">
								{#each dayToEvent[day] as schedule, ii}
									<div
										style="top: {schedule.top}%; height: {schedule.height}%; width: {schedule.width}%; left: {schedule.left}%;"
										class="absolute rounded-md flex justify-center items-center text-xs"
									>
										<div class="aspect-1 h-full block">
											<Card delay={ii * 100}>
												<p
													style="transform: translate(-50%, -50%)"
													class="dark:text-white text-black font-bold whitespace-nowrap absolute -top-2 left-1/2 xl:block hidden"
												>
													{schedule.name}
												</p>
												<div class="h-full w-full overflow-clip rounded-md bg-gray-800">
													<img src={schedule.icon} class="w-full h-full object-cover" alt="" />
													<a href="#{schedule.id}" class="absolute left-0 top-0 w-full h-full" />
												</div>
											</Card>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="w-full px-4 md:px-16 lg:px-16 text-left relative">
		{#each data.events as event, ii}
			<div id={event.id} class="pt-32">
				<h1 class=" text-2xl font-semibold">{event.name}</h1>
				<img src={event.icon} class="w-full md:w-1/2" alt="" />
				<p class=" my-4 whitespace-pre-wrap">	{@html makeLinksWork(event.description)}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	@media (prefers-color-scheme: light) {
		.gradient {
			background-image: linear-gradient(white, rgb(147 197 253));
		}
	}
	@media (prefers-color-scheme: dark) {
		.gradient {
			background-image: linear-gradient(rgb(31 41 55), rgb(30 58 138));
		}
	}

	.scrollable {
	}
	@media (max-width: 768px) {
		.scrollable {
			height: calc(16rem + 10px);
			overflow-x: scroll;
		}
	}

	.item:hover > span {
		opacity: 1;
	}
	.item > span {
		transition: opacity 0.2s ease;
		transform: translate(-50%, -50%);
		white-space: nowrap;
	}
	.white-shadow {
		filter: blur(3px);
	}
</style>
