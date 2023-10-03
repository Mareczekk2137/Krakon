import { pb } from '$lib/pocketbase.ts';

export async function load() {
	const events = await pb.collection('aktualne_wydarzenia').getFullList(200 /* batch size */, {
		sort: 'date'
	});
	events.forEach((event, ii) => {
		event.icon = pb.getFileUrl(event, event.icon);
		events[ii] = event;
	});

	return {
		events: events,
		days: [5,6,0],
	};
}
