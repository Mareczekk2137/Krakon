<script>
	import Card from '$lib/Card.svelte';
	import ImageView from '$lib/ImageView.svelte';

	export let data;

	let times = [];
	for (let i = 0; i <= 24; i += 2) {
		times.push(String(i) + ':00');
	}
	let dayEvents = [[], [], [], [], [], [], []];
	data.shedule.forEach((e) => {
		let StartDates = [],
			EndDates = [];
		e.expand.events.forEach((event, i) => {
			StartDates.push(new Date(event.date));
			EndDates.push(new Date(event.dateEnd));
			event.hover = false;
			e.expand.events[i] = event;
		});

		let StartDate = new Date(Math.min(...StartDates));
		let EndDate = new Date(Math.max(...EndDates));

		e.Yoffset = StartDate.getHours() + StartDate.getMinutes() / 60 - 1;
		e.hours =
			EndDate.getHours() +
			EndDate.getMinutes() / 60 -
			(StartDate.getHours() + StartDate.getMinutes() / 60);
		let day = StartDate.getDay();
		if (day === 0) {
			day = 6;
		} else {
			day -= 1;
		}
		e.hover = false;
		dayEvents[day].push(e);
	});

	let dayToNum = {
		Poniedzialek: 0,
		Wtorek: 1,
		Sroda: 2,
		Czwartek: 3,
		Piatek: 4,
		Sobota: 5,
		Niedziela: 6
	};
	//style="aspect-ratio: 1 / .3"
</script>

<div class="w-full h-full text-center pt-16">
	<div class="w-full flex flex-row relative h-64 md:h-96">
		{#each times as time, i}
			<div
				style="top: calc({i} * (100% - 2rem) / {times.length - 1} + 1.375rem)"
				class="absolute text-sm text-right w-12 flex items-center"
			>
				{time}
			</div>
		{/each}

		<div class="scrollable sm:w-full md:h-96 border-x border-blue-500  ml-14 lg:mr-14 relative">
			<div class="min-w-[32rem] w-full h-full flex flex-row">
				{#each times as time, i}
					<div
						style="left: -0.5rem; top: calc({i} * (100% - 2rem) / {times.length -
							1} + 2rem - 0.1rem); height: 0.1rem; width: calc(100% + 0.5rem)"
						class="bg-blue-100 absolute flex items-center "></div>
				{/each}

				{#each data.days as day}
					<div
						style:width="{100 / data.days.length}%"
						class=" flex flex-col border-x border-blue-500 relative"
					>
						<div
							style="height: {2}rem; background-image: linear-gradient(rgb(31 41 55), rgb(96 165 250));"
							class="w-full border-b-2 border-blue-500 flex justify-center items-center font-extrabold"
						>
							{day}
						</div>
						<div style:height="calc(100% - 2rem)" class="w-full relative">
							{#each dayEvents[dayToNum[day]] as shedule, ii}
								<div
									on:mouseenter={() => {
										shedule.hover = true;
									}}
									on:mouseleave={() => {
										shedule.hover = false;
									}}
									style="top: {(100 * shedule.Yoffset) / 24}%; height: {(100 / 24) *
										shedule.hours}%"
									class="w-full absolute rounded-md flex justify-end items-end text-xs"
								>
									<Card delay={ii * 100}>
										<span
											style="opacity: {shedule.hover ? 0 : 1}; transition: .2s ease opacity"
											class=" bottom-0 right-0 absolute mr-2 font-bold text-lg z-20 pointer-events-none"
										>
											{shedule.title}
										</span>
										<span
											style="opacity: {shedule.hover ? 0 : 1}; transition: .2s ease opacity"
											class="bg-opacity-70 text-white bg-white white-shadow bottom-0 right-0 absolute text-lg mr-2 z-10 pointer-events-none text-opacity-0 "
										>
											{shedule.title}
										</span>
										<ImageView>
											{#each shedule.expand.events as e}
												<div class="h-full item">
													<img src={e.icon} class="w-full h-full object-cover" />
													<span
														class="top-1/2 left-1/2 absolute font-bold opacity-0 z-10 pointer-events-none text-sm"
													>
														{e.name}
													</span>
													<span
														class="top-1/2 left-1/2 absolute  bg-opacity-50 font-bold opacity-0 white-shadow bg-white text-sm text-white pointer-events-none"
													>
														{e.name}
													</span>

													<a href="#{e.id}" class="absolute left-0 top-0 w-full h-full"></a>
												</div>
											{/each}
										</ImageView></Card
									>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="w-full pb-16 mt-16 px-4 md:px-16 lg:px-16 text-left relative">
		{#each data.events as event, ii}
			<div id={event.id} class="pt-8">
				<h1 class=" text-2xl font-semibold">{event.name}</h1>
				<p class=" my-4 break-all">{event.description}</p>
			</div>
		{/each}
	</div>
</div>

<style>
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
