import { AnyVariables, gql } from "urql";

export type PostEditData = {
  viewer: {
    post: {
      id: string;
      slug: string;
      title: string;
      description: string;
      blobs: {
        id: string;
        content: string;
      }[];
      tags: {
        slug: string;
        name: string;
      }[];
      thumbnailUrl: string;
      visibility: "public" | "private";
    } | null;
  };
  site: {
    slug: string;
    namespace: {
      slug: string;
      tags: {
        slug: string;
        name: string;
      }[];
    };
  };
};

type PostEditVariables = {
  site: string;
  namespace: string;
  slug: string;
};

export const postEditQuery = gql<PostEditData, PostEditVariables>`
  query($site: String!, $namespace: String!, $slug: String!) {
    viewer {
      post(site: $site, namespace: $namespace, slug: $slug) {
        id slug title description thumbnailUrl visibility
        blobs { id uuid content }
        tags { slug name }
      }
    }
    site(slug: $site) {
      slug
      namespace(slug: $namespace) {
        slug
        tags { slug name }
      }
    }
  }
`;

export const createPostMutation = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      post { slug }
    }
  }
`;

export const updatePostMutation = gql`
  mutation($postInput: UpdatePostInput!, $blobInput: UpdateBlobInput!) {
    updatePost(input: $postInput) {
      clientMutationId
    }
    updateBlob(input: $blobInput) {
      clientMutationId
    }
  }
`;

