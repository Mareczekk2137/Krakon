import { pb } from '$lib/pocketbase.ts';

export async function load() {
	const resultList = await pb.collection('blog').getList(1, 50, {
		sort: '-created'
	});
	// records is a list of dictionaries
	resultList.items.forEach((e, i) => {
		e.icon = pb.getFileUrl(e, e.icon);
		resultList[i] = e;
	});
	return {
		...resultList
	};
}
