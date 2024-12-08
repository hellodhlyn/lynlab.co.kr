import { SiGithub, SiBluesky, SiInstagram, SiLinkedin } from "@icons-pack/react-simple-icons";
import type { MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { PostList } from "~/components/organisms/hobby";
import { Footer, Navigation } from "~/components/organisms/layout";
import { graphql } from "~/graphql";
import type { HomePostsQuery } from "~/graphql/graphql";
import { client } from "~/lib/graphql/client.server";

const query = graphql(`
  query HomePosts {
    site(slug: "lynlab.co.kr") {
      namespace(slug: "blog") {
        posts(first: 8, sort: CREATED_DESC) {
          edges {
            node {
              slug title description thumbnailUrl thumbnailBlurhash
            }
          }
        }
      }
    }
  }
`);

export const meta: MetaFunction = () => ([
  { title: "소개 | LYnLab" },
]);

export const loader = async () => {
  const { data, error }  = await client.query<HomePostsQuery>(query, {});
  if (error || !data?.site?.namespace?.posts) {
    return json({ posts: [] });
  }
  return json({ posts: data.site.namespace.posts.edges.map(({ node }) => node!) });
};

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      <Navigation />
      <div className="w-full max-w-6xl mx-auto">
        <p className="mt-16 md:mt-32 p-4 font-bold text-neutral-800 tracking-widest">ABOUT ME</p>
        <div className="p-8 md:p-16 w-full bg-neutral-800 text-neutral-100 relative shadow-lg">
          <p className="text-4xl md:text-6xl font-black">Hoerin Do</p>
          <p className="my-4 text-lg md:text-2xl">[도회린 / ド・ホェリン]</p>
          <p className="my-4 md:text-xl">
            Software Engineer<br />
            Dept of Computer Science, Yonsei University
          </p>
          <div className="mt-8 flex gap-x-4">
            <a href="https://instagram.com/hellodhlyn" target="_blank" rel="noreferrer">
              <SiInstagram className="size-5 md:size-6 hover:opacity-50 transition-opacity" />
            </a>
            <a href="https://bsky.app/profile/lynlab.cc" target="_blank" rel="noreferrer">
              <SiBluesky className="size-5 md:size-6 hover:opacity-50 transition-opacity" />
            </a>
            <a href="https://www.linkedin.com/in/hellodhlyn" target="_blank" rel="noreferrer">
              <SiLinkedin className="size-5 md:size-6 hover:opacity-50 transition-opacity" />
            </a>
            <a href="https://github.com/hellodhlyn" target="_blank" rel="noreferrer">
              <SiGithub className="size-5 md:size-6 hover:opacity-50 transition-opacity" />
            </a>
          </div>
        </div>

        <p className="mt-16 md:mt-32 p-4 font-bold text-neutral-800 tracking-widest">프로젝트</p>
        <Link to="/blog">
          <div className="my-4 p-8 bg-white hover:opacity-50 transition">
            <p className="mb-2 text-2xl font-bold">LYnLab →</p>
            <p>개발, 취미 이야기 종합 블로그</p>
          </div>
        </Link>
        <a href="https://mollulog.net" target="_blank" rel="noreferrer">
          <div className="my-4 p-8 bg-gradient-to-br from-cyan-500 to-blue-600 text-neutral-100 hover:opacity-75 transition">
            <p className="mb-2 text-2xl font-bold">몰루로그 →</p>
            <p>게임 "블루 아카이브" 이벤트 미래시, 컨텐츠 정보 모음</p>
          </div>
        </a>

        <p className="mt-16 md:mt-32 p-4 font-bold text-neutral-800 tracking-widest">최근 글</p>
        <PostList
          posts={posts.map((post) => ({
            ...post,
            link: `https://lynlab.co.kr/blog/${post.slug}`,
          }))}
        />
      </div>

      <div className="h-16" />
      <Footer />
    </>
  );
}
