import { pb } from '$lib/pocketbase.ts';

export async function load() {
	const events = await pb.collection('aktualne_wydarzenia').getFullList(200 /* batch size */, {
		sort: 'date'
	});
	const schedule = await pb.collection('harmonogram').getFullList(200 /* batch size */, {
		expand: 'events'
	});
	// records is a list of dictionaries
	schedule.forEach((e, i) => {
		e.expand.events.forEach((event, ii) => {
			event.icon = pb.getFileUrl(event, event.icon);
			e.expand.events[ii] = event;
		});
		schedule[i] = e;
	});
	events.forEach((event, ii) => {
		event.icon = pb.getFileUrl(event, event.icon);
		events[ii] = event;
	});

	return {
		events: events,
		days: ['Piatek', 'Sobota', 'Niedziela'],
		shedule: schedule
	};
}
