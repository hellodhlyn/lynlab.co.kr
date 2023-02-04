import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import type { OperationResult } from "urql";
import { gql } from "urql";
import Container from "~/components/atoms/Container";
import TextButton from "~/components/atoms/TextButton";
import { PostEdit } from "~/components/organisms/blog/PostEdit";
import { runMutation, runQuery } from "~/lib/graphql/client.server";
import type { Params } from "react-router";

type QueryData = {
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
      thumbnailUrl: string;
    } | null;
  };
  site: {
    slug: string;
    namespace: {
      slug: string;
    };
  };
};

const query = gql<QueryData>`
  query($site: String!, $namespace: String!, $slug: String!) {
    viewer {
      post(site: $site, namespace: $namespace, slug: $slug) {
        id slug title description thumbnailUrl
        blobs { id uuid content }
      }
    }
    site(slug: $site) {
      slug
      namespace(slug: $namespace) {
        slug
      }
    }
  }
`;

const createPostMutation = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      post { slug }
    }
  }
`;

const updatePostMutation = gql`
  mutation($postInput: UpdatePostInput!, $blobInput: UpdateBlobInput!) {
    updatePost(input: $postInput) {
      clientMutationId
    }
    updateBlob(input: $blobInput) {
      clientMutationId
    }
  }
`;

export const loader: LoaderFunction = async ({ request, params }) => {
  const { data } = await runQuery<QueryData>(query, params, request);
  if (!data) {
    throw new Error("Failed to fetch data");
  }
  return json<QueryData>(data);
};

async function createPost(params: Params, body: FormData, request: Request): Promise<OperationResult> {
  const { site, namespace } = params;
  const input = {
    site, namespace,
    slug: body.get("slug"),
    title: body.get("title"),
    description: body.get("description"),
    thumbnailUrl: body.get("thumbnailUrl") || null,
    blobs: [
      { type: "markdown", content: body.get("content") },
    ],
  };

  return runMutation(createPostMutation, { input }, request);
}

async function updatePost(params: Params, body: FormData, request: Request): Promise<OperationResult> {
  const postInput = Object.fromEntries(Object.entries({
    id: body.get("postId"),
    title: body.get("title") || null,
    description: body.get("description") || null,
    thumbnailUrl: body.get("thumbnailUrl") || null,
  }).filter(([, value]) => value !== null));

  const blobInput = {
    id: body.get("blobId"),
    content: body.get("content"),
  };

  return runMutation(updatePostMutation, { postInput, blobInput }, request);
}

export const action: ActionFunction = async ({ params, request }) => {
  const body = await request.formData();
  const newPost = !!body.get("slug");
  if (newPost) {
    const { error } = await createPost(params, body, request);
    if (error) {
      console.error(error);
      return new Response(null, { status: 400 });
    } else {
      return redirect(encodeURI("/dash?result=succeed&message=새로운 글을 작성했어요."));
    }
  } else {
    const { error } = await updatePost(params, body, request);
    if (error) {
      console.error(error);
      return new Response(null, { status: 400 });
    } else {
      return redirect(encodeURI("/dash?result=succeed&message=글을 수정했어요."));
    }
  }
};

export default function NewPost() {
  const { site, viewer } = useLoaderData<QueryData>();
  return (
    <Container className="mb-16">
      <Form method="post">
        <PostEdit site={site} post={viewer.post || undefined} />
        <div className="py-4">
          <TextButton type="submit" text="작성 완료" />
        </div>
      </Form>
    </Container>
  );
}
