import { pb } from '$lib/pocketbase.ts';

export async function load() {
	const resultList = await pb.collection('users').getList(1, 50, {
		sort: 'created'
	});
	// records is a list of dictionaries
	resultList.items.forEach((e, i) => {
		e.avatar = pb.getFileUrl(e, e.avatar);
		resultList[i] = e;
	});
	return {
		...resultList
	};
}
