import fs from "fs"
import { getAllPosts } from "./content"
import config from "./site.config"

async function genSitemap() {
  const posts = await getAllPosts(["slug", "date"])
  const pages = [
    { url: "/news", priority: "1.0" },
    { url: "/contact", priority: "0.5" },
  ]

  const urls = [
    ...pages.map(
      p => `  <url>
    <loc>${config.url}${p.url}</loc>
    <priority>${p.priority}</priority>
  </url>`
    ),
    ...posts.map(
      post => `  <url>
    <loc>${config.url}/news/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split("T")[0]}</lastmod>
    <priority>0.8</priority>
  </url>`
    ),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`
  fs.writeFileSync("./public/sitemap.xml", sitemap)
}

genSitemap()
