import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import Alert from "~/components/atoms/blobs/Alert";
import Container from "~/components/atoms/Container";
import { runQuery } from "~/lib/graphql/client.server";
import { graphql } from "~/graphql";
import type { DashboardIndexQuery } from "~/graphql/graphql";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Title } from "~/components/atoms/typography";

const query = graphql(`
  query DashboardIndex {
    sites {
      slug
      namespaces {
        site { slug }
        slug
      }
    }
  }
`);

export const loader = async () => {
  const { data, error } = await runQuery(query, {});
  if (error || !data) {
    console.error("Failed to load data:", error);
    throw new Error();
  }

  return json(data);
};

export default function DashboardIndex() {
  const loaderData = useLoaderData() as DashboardIndexQuery;
  const namespaces = loaderData.sites!.flatMap(site => site.namespaces);

  const [searchParams] = useSearchParams();
  const redirectedResult = searchParams.get("result");
  const redirectedMessage = searchParams.get("message");

  return (
    <>
      {(redirectedResult === "succeed") && (
        <Container>
          <Alert color="green" icon="✅" content={redirectedMessage || "요청을 성공적으로 처리했어요."} />
        </Container>
      )}
      <Container className="mb-16">
        <Title text="글 관리" />
        <ul>
          {namespaces.map((namespace) => (
            <li key={`${namespace.site.slug}/${namespace.slug}`} className="hover:opacity-50 transition-opacity">
              <Link to={`/dash/posts/${namespace.site.slug}/${namespace.slug}`}>
                <p className="my-2 flex text-lg gap-x-2 font-light">
                  <DocumentTextIcon className="h-5 w-5 self-center" />
                  <span>{namespace.site.slug}</span>
                  <span className="text-gray-300">/</span>
                  <span>{namespace.slug}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
