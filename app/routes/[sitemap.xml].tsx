import { json } from "@remix-run/cloudflare";
import type { LoaderFunction } from "@remix-run/cloudflare";
import dayjs from "dayjs";
import { getFeed } from "~/lib/feed/feed";

export const loader: LoaderFunction = async () => {
  const feed = await getFeed();
  if (!feed) {
    throw json(null, { status: 500 });
  }

  const xmlUrls = feed.items.map((item) => {
    const updatedAt = dayjs(item.date);
    return `
      <url>
        <loc>${item.link}</loc>
        <lastmod>${updatedAt.format("YYYY-MM-DD")}</lastmod>
        <priority>${(1.0 + 0.1 * updatedAt.diff(new Date(), "year")).toFixed(1)}</priority>
      </url>
    `;
  }).join("\n");

  const xmlPrefix = "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
  const xmlPostfix = "</urlset>";
  const sitemap = `
    ${xmlPrefix}
    ${xmlUrls}
    ${xmlPostfix}
  `.trimStart();

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      "encoding": "utf-8",
    },
  });
};
