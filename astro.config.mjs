import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://lucaschristian.com',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'nord',
      wrap: true
    }
  }
});
