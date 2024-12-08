import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Container from "~/components/atoms/Container";
import { Title } from "~/components/atoms/typography";
import { PostList } from "~/components/organisms/hobby";
import { graphql } from "~/graphql";
import type { HobbyIndexQuery } from "~/graphql/graphql";
import { runQuery } from "~/lib/graphql/client.server";

const query = graphql(`
  query HobbyIndex ($featuredContentSlugs: [String!]) {
    featuredContents(slugs: $featuredContentSlugs) {
      slug
      title
      description
      posts(sort: CREATED_DESC) {
        nodes {
          site { slug }
          namespace { slug }
          slug
          title
          description
          thumbnailBlurhash
          thumbnailUrl
        }
      }
    }
  }
`);

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { env } = context.cloudflare;
  const featuredSlugs = (await env.SITE_CONFIGS.get("hobby-featured-slugs.txt"))?.split(",") ?? [];

  const { data } = await runQuery<HobbyIndexQuery>(query, { featuredContentSlugs: featuredSlugs });
  const featuredContents = [];
  if (data) {
    featuredContents.push(...data.featuredContents.map((each) => ({
      slug: each.slug,
      title: each.title,
      description: each.description,
      posts: each.posts.nodes,
    })));
  }

  return json({ featuredContents });
};

export const meta: MetaFunction = () => {
  return [
    { title: "취미로그 | LYnLab" },
    { name: "description", content: "게임, 만화, 보컬로이드 - 종합 컨텐츠 블로그" },
  ];
};

export default function HobbyIndex() {
  const { featuredContents } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Title text="글 모음" />
      {featuredContents.map(({ slug, title, description, posts }) => (
        <div key={`featured-${slug}`} className="my-8 -mx-4 md:-mx-8">
          <p className="px-4 md:px-8 my-2 text-2xl font-bold">{title}</p>
          <p className="px-4 md:px-8 my-2">{description}</p>
          <PostList
            posts={posts.map((post) => ({
              ...post,
              link: `https://${post.site.slug}/${post.namespace.slug}/${post.slug}`,
            }))}
          />
        </div>
      ))}
    </Container>
  );
}
