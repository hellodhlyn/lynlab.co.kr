import { graphql } from 'react-relay';

export default graphql`
  query indexPage_indexQuery($after: String, $before: String, $first: Int, $last: Int) {
    posts(after: $after, before: $before, first: $first, last: $last) {
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
      edges {
        node {
          id
          postId
          title
          description
          thumbnailUrl
          tags { name }
          createdAt
        }
      }
    }
  }
`;
