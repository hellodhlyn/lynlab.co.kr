import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import Container from "~/components/atoms/Container";
import { graphql } from "~/graphql";
import { BlobTypeEnum, OpinionViewQuery } from "~/graphql/graphql";
import { client } from "~/lib/graphql/client.server";

const errorInternal = "internal_error";
const errorPostNotFound = "post_not_found";

const query = graphql(`
  query OpinionView($slug: String!) {
    post(site: "lynlab.co.kr", namespace: "opinion", slug: $slug) {
      slug title createdAt
      blobs {
        uuid type
        ... on MarkdownBlob { text }
      }
    }
  }
`);

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug!;
  const { data, error } = await client.query<OpinionViewQuery>(query, { slug }).toPromise();
  if (error) {
    throw json({ error: errorInternal }, { status: 500 });
  } else if (!data?.post) {
    throw json({ error: errorPostNotFound }, { status: 404 });
  }

  const { post } = data;
  return json({
    post: {
      ...post,
      blobs: post.blobs.filter((blob) => blob.__typename === "MarkdownBlob") as { uuid: string; type: BlobTypeEnum; text: string }[],
    },
  })
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [
      { title: "사설 | LYnLab" },
    ];
  }

  const { post } = data;
  const description = post.blobs[0].text.split(".").slice(0, 2).join(".") + ".";
  return [
    { title: `${post.title} | LYnLab` },
    { date: post.createdAt },
    { name: "og:title", content: post.title },
    { name: "og:description", content: description },
    { name: "og:url", content: `https://lynlab.co.kr/opinion/${post.slug}` },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: description },
  ];
};

export default function OpinionView() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <Container>
      <div className="flex">
        <div className="max-w-3xl">
          <span className="px-2 py-1 text-white bg-neutral-900 text-sm font-bold">사설</span>
          <h1 className="my-2 text-3xl md:text-4xl font-black tracking-tighter">{post.title}</h1>
          <p className="text-neutral-500">{dayjs(post.createdAt).format("YYYY-MM-DD")}</p>

          <div className="my-8 text-lg">
            {post.blobs.map((blob) => (
              <div key={blob.uuid} className="whitespace-pre-line leading-relaxed">
                {blob.text}
              </div>
            ))}
          </div>

          <div className="my-16">
            <p className="text-neutral-500 text-sm">
              이 글의 내용을 작성자의 개인적인 견해로 소속된 단체의 의견을 대변하지 않습니다.
            </p>
          </div>
        </div>
        <div className="shrink" />
      </div>
    </Container>
  );
}
