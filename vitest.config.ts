/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig(
  {
    test: {
      // Vitest configuration options
    }
  },
  {
    site: 'https://zimmymonkey.com',
    trailingSlash: 'always'
  }
);
