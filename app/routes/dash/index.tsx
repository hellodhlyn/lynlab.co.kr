import { useLoaderData, useSearchParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useOutletContext } from "react-router";
import { gql } from "urql";
import Alert from "~/components/atoms/blobs/Alert";
import Container from "~/components/atoms/Container";
import { ProfileInfo } from "~/components/organisms/dashboard/ProfileInfo";
import { SiteInfo } from "~/components/organisms/dashboard/SiteInfo";
import { client } from "~/lib/graphql/client.server";
import type { User } from "~/lib/auth/client";

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

export default function DashboardIndex() {
  const { namespaces } = useLoaderData<Site>().site;

  const [searchParams] = useSearchParams();
  const redirectedFrom = searchParams.get("from");
  const redirectedResult = searchParams.get("result");
  const alertProfileUpdated = (redirectedFrom === "/dash/profile/update" && redirectedResult === "succeed");

  const currentUser = useOutletContext<User>();
  return (
    <>
      {alertProfileUpdated && (
        <Container>
          <Alert color="green" icon="✅" content="계정 정보를 바꿨습니다." />
        </Container>
      )}
      <ProfileInfo currentUser={currentUser} />
      <div className="py-8" />
      <SiteInfo slug={siteSlug} namespaces={namespaces} />
    </>
  );
}
