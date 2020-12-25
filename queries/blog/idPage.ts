import { graphql } from 'react-relay';

export default graphql`
  query idPage_postQuery($postId: Int!) {
    post(postId: $postId) {
      title
      description
      thumbnailUrl
      tags { name }
      blobs { uuid content }
      relatedPosts(first: 3) {
        edges {
          node { postId title thumbnailUrl description }
        }
      }
      createdAt
    }
  }
`;
