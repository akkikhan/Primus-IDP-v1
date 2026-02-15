import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100").replace(/\/$/, "");
	const lastModified = new Date();

	return [
		{
			url: `${baseUrl}/`,
			lastModified,
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified,
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${baseUrl}/pricing`,
			lastModified,
			changeFrequency: "yearly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/privacy`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/terms`,
			lastModified,
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/docs`,
			lastModified,
			changeFrequency: "weekly",
			priority: 0.9,
		},
	];
}


