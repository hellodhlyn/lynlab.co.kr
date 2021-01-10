import { graphql } from 'react-relay';

export const postQuery = graphql`
  query idPage_postQuery($postId: Int!) {
    post(postId: $postId) {
      postId
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

export const postIdsQuery = graphql`
  query idPage_postIdsQuery {
    posts(first: 9999) {
      edges {
        node { postId }
      }
    }
  }
`;
