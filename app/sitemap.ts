import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://acmchapter.vercel.app"

  const routes = [
    "",
    "/team",
    "/events",
    "/blogs",
    "/projects",
    "/research",
    "/sponsors",
    "/stats",
    "/membership",
    "/donate",
    "/contact",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : ("monthly" as const),
    priority: route === "" ? 1 : 0.8,
  }))
}
