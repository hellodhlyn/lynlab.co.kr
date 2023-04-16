import { LoaderFunction, json } from "@remix-run/cloudflare";
import { runQuery } from "~/lib/graphql/client.server";
import { recommendationQuery } from "./_recommends.graphql";

export const loader: LoaderFunction = async ({ request }) => {
  const titleQuery = new URL(request.url).searchParams.get("title");
  if (titleQuery === null || titleQuery.length < 2) {
    return json([]);
  }

  const { data, error } = await runQuery(recommendationQuery, { titleQuery });
  if (error || !data) {
    return json([]);
  }
  return json(data.site.namespace.posts.nodes);
};
