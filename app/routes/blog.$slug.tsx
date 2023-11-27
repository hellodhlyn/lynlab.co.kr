import { useLoaderData, useRouteError } from "@remix-run/react";
import { ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/cloudflare";
import { client } from "~/lib/graphql/client.server";
import { graphql } from "~/graphql";
import { PostViewQuery } from "~/graphql/graphql";
import Container from "~/components/atoms/Container";
import { Divider } from "~/components/atoms/Divider";
import { ActivityButtons, PostComment, PostContent, PostIntro, PostTableOfContents, RelatedPosts, TableOfContents } from "~/components/organisms/blog";
import Error from "~/components/templates/error/Error";
import { useState } from "react";

const errorInternal = "internal_error";
const errorPostNotFound = "post_not_found";

const query = graphql(`
  query PostView($slug: String!) {
    post(site: "lynlab.co.kr", namespace: "blog", slug: $slug) {
      title slug description thumbnailUrl createdAt
      blobs {
        uuid type
        ... on MarkdownBlob { text }
        ... on ImageBlob { url previewUrl caption }
      }
      tags {
        slug name
        posts(first: 4, sort: CREATED_DESC) {
          nodes {
            title slug description thumbnailUrl createdAt
          }
        }
      }
    }
  }
`);

type LoaderData = {
  post: Exclude<PostViewQuery["post"], null>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug!;
  const { data, error } = await client.query(query, { slug }).toPromise();
  if (error) {
    throw json({ error: errorInternal }, { status: 500 });
  } else if (!data?.post) {
    throw json({ error: errorPostNotFound }, { status: 404 });
  }
  return json<LoaderData>({ post: data.post! });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [
      { title: "블로그 | LYnLab" },
    ];
  }

  const { post } = data;
  return [
    { title: `${post.title} | LYnLab` },
    { name: "description", content: post.description },
    { name: "og:title", content: post.title },
    { name: "og:image", content: post.thumbnailUrl },
    { name: "og:description", content: post.description },
    { name: "og:url", content: `https://lynlab.co.kr/blog/${post.slug}` },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: post.description },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

export function links() {
  return [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/monokai.min.css" },
  ];
}

export const ErrorBoundary: ErrorBoundaryComponent = () => {
  const error: { data: any } = useRouteError() as any;
  let errorMessage = "";
  if (error?.data?.error === errorPostNotFound) {
    errorMessage = "작성된 글을 찾을 수 없어요 :(";
  } else {
    errorMessage = "알 수 없는 문제가 발생했어요 :(";
  }

  return <Error message={errorMessage} />;
};

const uniquePostFilter = (post: { slug: string }, index: number, array: { slug: string }[]): boolean => {
  return array.findIndex((p) => p.slug === post.slug) === index;
}

export default function BlogPost() {
  const { post } = useLoaderData<LoaderData>();

  const [toc, setToc] = useState<TableOfContents>([]);

  const relatedPosts = post.tags.flatMap((tag) => tag.posts.nodes)
    .filter((relatedPost) => post.slug !== relatedPost.slug)
    .filter(uniquePostFilter)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.description || null,
      thumbnailUrl: post.thumbnailUrl || null,
    }))
    .slice(0, 3);

  return (
    <>
      <Container className="max-w-5xl py-8">
        <div className="w-full flex flex-row-reverse">
          <div className="hidden md:block w-64 shrink-0">
            <div className="h-full w-full">
              <PostTableOfContents toc={toc} />
            </div>
          </div>

          <div className="min-w-0">
            <PostIntro
              title={post.title}
              description={post.description || null}
              thumbnailUrl={post.thumbnailUrl || null}
              createdAt={post.createdAt}
              tags={post.tags}
            />
            <PostContent blobs={post.blobs} onTocReady={setToc} />
          </div>
        </div>

        {(relatedPosts.length > 0) && (
          <>
            <Divider />
            <RelatedPosts posts={relatedPosts} />
          </>
        )}
        <Divider />
        <PostComment />
      </Container>
      <ActivityButtons url={`https://lynlab.co.kr/blog/${post.slug}`} title={post.title} />
    </>
  );
}
