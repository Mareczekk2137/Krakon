import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		allowedFileTypes: ['ico', 'png', 'jpg', 'jpeg', 'gif', 'svg'],
		public: './',
	}
};

export default config;
