import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/cloudflare";
import Container from "~/components/atoms/Container";
import { runQuery } from "~/lib/graphql/client.server";
import { graphql } from "~/graphql";
import { authenticator } from "~/lib/auth/authenticator.server";
import { DashboardSiteQuery } from "~/graphql/graphql";
import TextButton from "~/components/atoms/TextButton";
import { Env } from "~/env";
import { Title } from "~/components/atoms/typography";
import { PostList, SiteSelector } from "~/components/organisms/dashboard";

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

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const user = await authenticator(context.env as Env).isAuthenticated(request);
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
        <Title text="글 관리" />
        <SiteSelector
          sites={sites!}
          currentSite={site}
          currentNamespace={namespace}
          currentPost={slug}
        />
        <div className="my-4">
          <Link to="./new">
            <TextButton type="button" text="새 글 쓰기" />
          </Link>
        </div>
        <PostList posts={posts} />
      </Container>
      <Outlet />
    </>
  );
}
