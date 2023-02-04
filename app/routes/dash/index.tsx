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
  const redirectedResult = searchParams.get("result");
  const redirectedMessage = searchParams.get("message");

  const currentUser = useOutletContext<User>();
  return (
    <>
      {(redirectedResult === "succeed") && (
        <Container>
          <Alert color="green" icon="✅" content={redirectedMessage || "요청을 성공적으로 처리했어요."} />
        </Container>
      )}
      <ProfileInfo currentUser={currentUser} />
      <div className="py-8" />
      <SiteInfo slug={siteSlug} namespaces={namespaces} />
    </>
  );
}
