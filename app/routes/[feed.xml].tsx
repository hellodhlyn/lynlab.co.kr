import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { getFeed } from "~/lib/feed/feed";

export const loader: LoaderFunction = async () => {
  const feed = await getFeed();
  if (!feed) {
    throw json(null, { status: 500 });
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      "encoding": "UTF-8",
    },
  });
};
