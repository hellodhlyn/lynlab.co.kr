import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { fetchQuery, Variables } from 'react-relay';
import { initEnvironment } from '../../lib/relay';
import query from '../../queries/blog/indexPage';

const BlogIndex = ({ posts }) => (
  <div>
    {posts.edges.map((edge) => edge.node).map((post) => (
      <div key={post.id}>
        <Link href={`/blog/${post.postId}`}>{post.title}</Link>
      </div>
    ))}
    {posts.pageInfo.hasPreviousPage
      ? <Link href={`?before=${posts.pageInfo.startCursor}`}>이전 페이지</Link> : null}
    {posts.pageInfo.hasNextPage
      ? <Link href={`?after=${posts.pageInfo.endCursor}`}>다음 페이지</Link> : null}
  </div>
);

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { before, after } = context.query;
  let variables: Variables = { first: 15 };
  if (before) {
    variables = { before, last: 15 };
  } else if (after) {
    variables = { after, first: 15 };
  }

  const environment = initEnvironment();
  const queryProps = await fetchQuery(environment, query, variables);
  const initialRecords = environment.getStore().getSource().toJSON();
  return {
    props: { ...queryProps, initialRecords },
  };
};

export default BlogIndex;
