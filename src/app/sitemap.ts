import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theblogtide.com'

  // Fetch your blog posts from your API or Supabase
  const res = await fetch(`${baseUrl}/api/posts`, {
    cache: 'no-store',
  })

  const posts = await res.json()

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at),
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postUrls,
  ]
}