// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Project site published at https://thormikdev.github.io/freegrab-docs/
// https://astro.build/config
export default defineConfig({
	site: 'https://thormikdev.github.io',
	base: '/freegrab-docs',
	integrations: [
		starlight({
			title: 'FreeGrab',
			description:
				'A refinement-based, gaze-assisted indirect pointing technique for XR.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/ThormikDev/freegrab-docs',
				},
			],
			sidebar: [
				{ label: 'The Technique', slug: 'technique' },
				{
					label: 'Design Space',
					items: [
						{ label: 'Overview', slug: 'design-space' },
						{ label: 'The Pipeline', slug: 'design-space/pipeline' },
						{ label: 'Dimensions (Table 1)', slug: 'design-space/dimensions' },
						{ label: 'Value Matrix (Table 2)', slug: 'design-space/value-matrix' },
						{ label: 'Novelty Ledger', slug: 'design-space/novelty' },
						{ label: 'Parameters Appendix', slug: 'design-space/parameters' },
					],
				},
				{ label: 'Application Examples', slug: 'application-examples' },
				{ label: 'Changelog', slug: 'changelog' },
			],
		}),
	],
});
