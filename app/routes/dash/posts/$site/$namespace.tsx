import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { gql } from "urql";
import { SiteSelector } from "~/components/organisms/dashboard/SiteSelector";
import { client } from "~/lib/graphql/client.server";
import Header from "~/components/atoms/Header";
import Container from "~/components/atoms/Container";

type Site = {
  site: {
    slug: string;
    namespaces: {
      name: string;
      slug: string;
    }[];
  }
};

const siteSlug = "lynlab.co.kr";
const query = gql<Site>`
  query($slug: String!) {
    site(slug: $slug) {
      slug
      namespaces {
        name
        slug
      }
    }
  }
`;

export const loader: LoaderFunction = async () => {
  const { data } = await client.query<Site>(query, { slug: siteSlug }).toPromise();
  if (!data) {
    throw new Error("Failed to get site");
  }
  return json<Site>(data);
};

export default function PostNamespace() {
  const sites = [useLoaderData<Site>().site];
  const { site, namespace, slug } = useParams();
  return (
    <>
      <Container>
        <Header text="글 관리" />
        <SiteSelector
          sites={sites}
          currentSite={site}
          currentNamespace={namespace}
          currentPost={slug}
        />
      </Container>
      <Outlet />
    </>
  );
}
