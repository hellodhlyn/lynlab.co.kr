import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import dayjs from 'dayjs';
import { DiscussionEmbed } from 'disqus-react';
import ReactMarkdown from 'react-markdown';
import { fetchQuery } from 'react-relay';
import { initEnvironment } from '../../lib/relay';
import query from '../../queries/blog/idPage';

const BlogPost = ({ post }) => {
  const router = useRouter();
  const { id } = router.query;

  const relatedPosts = post.relatedPosts?.edges?.map((edge) => edge.node) || [];

  return (
    <div className="pb-16 space-y-16 bg-gray-000 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <Head>
        <title>{post.title} | LYnLab</title>
      </Head>
      <NextSeo title={post.title}
               description={post.description}
               canonical={`https://lynlab.co.kr/blog/${post.postId}`}
               openGraph={{
                 site_name: 'LYnLab',
                 title: post.title,
                 description: post.description,
                 type: 'article',
                 images: post.thumbnailUrl ? [{ url: post.thumbnailUrl }] : [],
                 url: `https://lynlab.co.kr/blog/${post.postId}`,
               }}
               twitter={{ cardType: 'summary_large_image', site: '@hellodhlyn', handle: '@hellodhlyn' }} />

      <div className="md:h-screen-50 w-full">
        <img className="h-screen-30 md:h-screen-50 w-full object-cover md:absolute" src={post.thumbnailUrl || '/images/header.jpg'} />
        <div className="md:h-screen-50 w-full md:absolute flex flex-wrap content-center">
          <div className="max-w-screen-lg mx-auto px-4 py-8 md:p-12 bg-gray-000 dark:bg-gray-900 bg-opacity-90">
            <p className="space-x-1 text-sm text-gray-700 dark:text-gray-500">
              {post.tags.map((tag) => <span key={tag.name}>#{tag.name}</span>)}
            </p>
            <p className="py-2 text-xl md:text-4xl font-bold">{post.title}</p>
            <p className="py-4 md:text-lg">{post.description}</p>
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-500">
              <img className="w-6 h-6 rounded-full object-cover" src="https://avatars2.githubusercontent.com/u/8597749?s=460&u=c9c8c5915bca6f7897ec5f5b2cba26afca67345c&v=4" alt="profile picture" />
              <p className="px-1">Hoerin Doh | {dayjs(post.createdAt).format('YYYY. MM. DD')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-0 w-24 mx-auto md:hidden border-b-2 border-gray-300 rounded-full" />

      <div>
        {post.blobs.map((blob) => (
          <div className="max-w-screen-lg mx-auto" key={blob.uuid}>
            <ReactMarkdown className="px-4 prose md:prose-lg dark:prose-dark max-w-none">{blob.content}</ReactMarkdown>
          </div>
        ))}
      </div>

      {
        relatedPosts.length === 0 ? null : (
          <div className="py-4 bg-gray-900 dark:bg-gray-800">
            <div className="max-w-screen-lg mx-auto px-4 py-8">
              <p className="mb-4 text-3xl text-gray-000">관련 포스트</p>
              {
                relatedPosts.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.postId}`}>
                    <div className="relative h-48 w-full my-3 bg-black cursor-pointer hover:opacity-80 text-gray-000"
                         key={`related-${relatedPost.postId}`}>
                      <img className="absolute h-full w-full object-cover opacity-30"
                           src={relatedPost.thumbnailUrl || '/images/header.jpg'} alt={`${relatedPost.title} 썸네일`}/>
                      <div className="absolute h-full w-full p-4 flex flex-col justify-center items-center text-center">
                        <p className="mb-2 text-lg md:text-xl font-bold">{relatedPost.title}</p>
                        <p className="text-sm md:text-base clamp-2">{relatedPost.description}</p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        )
      }

      <div className="max-w-screen-lg mx-auto px-4">
        <DiscussionEmbed shortname="lynlab" config={{ url: `https://lynlab.co.kr/blog/${id}` }}/>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const environment = initEnvironment();
  const queryProps = await fetchQuery(environment, query, { postId: parseInt(context.params.id as string, 10) }) as object;
  if (!queryProps.post) {
    return { notFound: true };
  }

  const initialRecords = environment.getStore().getSource().toJSON();
  return {
    props: { ...queryProps, initialRecords },
  };
};

export default BlogPost;
