import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import Header from "~/components/atoms/Header";
import Container from "~/components/atoms/Container";
import { SiteSelector } from "~/components/organisms/dashboard/SiteSelector";
import { PostList } from "~/components/organisms/dashboard/PostList";
import { runQuery } from "~/lib/graphql/client.server";
import { graphql } from "~/graphql";
import { authenticator } from "~/lib/auth/authenticator.server";
import { DashboardSiteQuery } from "~/graphql/graphql";

const query = graphql(`
  query DashboardSite($site: String!, $namespace: String!) {
    sites {
      slug
      namespaces { slug }
    }
    viewer {
      posts(last: 999, sort: CREATED_DESC, filter: { site: $site, namespace: $namespace }) {
        nodes {
          site { slug }
          namespace { slug }
          slug
          title
          visibility
          createdAt
        }
      }
    }
  }
`);

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);
  const { site, namespace } = params;
  
  const { data, error } = await runQuery(query, { site: site!, namespace: namespace! }, user!);
  if (error || !data) {
    console.error("Failed to load data:", error);
    throw new Error();
  }

  return json(data);
};

export default function PostNamespace() {
  const loaderData = useLoaderData() as DashboardSiteQuery;
  const sites = loaderData.sites;
  const posts = loaderData.viewer.posts.nodes;

  const { site, namespace, slug } = useParams();
  return (
    <>
      <Container>
        <Header text="글 관리" />
        <SiteSelector
          sites={sites!}
          currentSite={site}
          currentNamespace={namespace}
          currentPost={slug}
        />

        <PostList posts={posts} />
      </Container>
      <Outlet />
    </>
  );
}
