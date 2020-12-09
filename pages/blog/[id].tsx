import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { fetchQuery } from 'react-relay';
import { initEnvironment } from '../../lib/relay';
import query from '../../queries/blog/idPage';

const BlogPost = ({ post }) => {
  return (
    <div>
      <p>{post.title}</p>
      {post.blobs.map((blob) => (
        <div key={blob.uuid}>{blob.content}</div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const environment = initEnvironment();
  const queryProps = await fetchQuery(environment, query, { postId: parseInt(context.params.id as string, 10) });
  const initialRecords = environment.getStore().getSource().toJSON();
  return {
    props: { ...queryProps, initialRecords },
  };
};

export default BlogPost;
