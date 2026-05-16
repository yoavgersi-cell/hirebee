import { MetadataRoute } from "next"
import { POSTS } from "@/lib/blog"

const BASE = "https://hirebee.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.isoDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    { url: BASE,                   lastModified: new Date(), changeFrequency: "weekly",  priority: 1 },
    { url: `${BASE}/analyze`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/upgrade`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/cv-examples`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    ...blogPosts,
    { url: `${BASE}/login`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE}/privacy`,      lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/terms`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/refund`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ]
}
