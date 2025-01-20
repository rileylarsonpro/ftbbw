// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), vue()],
  adapter: node({
    mode: 'standalone'
  })
});
