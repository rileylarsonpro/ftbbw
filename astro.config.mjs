// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

import vue from '@astrojs/vue';

import partytown from '@astrojs/partytown';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://zimmymonkey.com',
  output: 'server',
  integrations: [tailwind(), vue(), partytown({
    config: {
      forward: ['dataLayer.push']
    }
  }), sitemap(), mdx()],
  adapter: node({
    mode: 'standalone'
  })
});