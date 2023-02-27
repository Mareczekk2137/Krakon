import { pb } from '$lib/pocketbase.ts';

export async function load({ params }) {
	const record = await pb.collection('blog').getOne(params.id, {
		expand: 'author'
	});
	return {
		...record
	};
}
