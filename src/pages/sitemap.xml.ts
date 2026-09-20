import { getCollection } from 'astro:content';
export async function GET() {
  const posts = await getCollection('blog');
  const paths = ['/', '/about', '/blog', ...posts.map(p => `/blog/${p.slug}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>https://lucaschristian.com${path}</loc></url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
