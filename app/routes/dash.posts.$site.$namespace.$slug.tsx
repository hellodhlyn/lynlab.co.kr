import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { gql, type OperationResult } from "urql";
import Container from "~/components/atoms/Container";
import TextButton from "~/components/atoms/TextButton";
import { PostEdit } from "~/components/organisms/blog/PostEdit";
import { graphql } from "~/graphql";
import { UpdatePostDataQuery } from "~/graphql/graphql";
import { authenticator } from "~/lib/auth/authenticator.server";
import { User } from "~/lib/auth/user";
import { runMutation, runQuery } from "~/lib/graphql/client.server";

const updatePostQuery = graphql(`
  query UpdatePostData($site: String!, $namespace: String!, $slug: String!) {
    site(slug: $site) {
      slug
      namespace(slug: $namespace) {
        slug
        tags { slug name }
      }
    }
    viewer {
      post(site: $site, namespace: $namespace, slug: $slug) {
        id slug title description thumbnailUrl visibility
        blobs { id uuid content }
        tags { slug name }
      }
    }
  }
`);

const updatePostMutation = gql`
  mutation UpdatePost($postInput: UpdatePostInput!, $blobInput: UpdateBlobInput!) {
    updatePost(input: $postInput) {
      clientMutationId
    }
    updateBlob(input: $blobInput) {
      clientMutationId
    }
  }
`;

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  const variables = { site: params.site!, namespace: params.namespace!, slug: params.slug! };
  const { data } = await runQuery(updatePostQuery, variables, user!);
  if (!data) {
    throw new Error("Failed to fetch data");
  }
  return json(data);
};

function parseTags(tagInput: FormDataEntryValue | null): string[] {
  if (!tagInput || typeof tagInput !== "string") {
    return [];
  }
  return tagInput.split(" ").map((tag) => tag.replace("#", "")).filter((tag) => tag.length > 0);
}

async function updatePost(body: FormData, user: User): Promise<OperationResult> {
  const postInput = Object.fromEntries(Object.entries({
    id: body.get("postId")!,
    title: body.get("title") || null,
    description: body.get("description") || null,
    thumbnailUrl: body.get("thumbnailUrl") || null,
    tags: parseTags(body.get("tags")),
    visibility: body.get("visibility"),
  }).filter(([, value]) => value !== null));

  const blobInput = {
    id: body.get("blobId")!,
    blob: {
      type: "markdown",
      markdown: { text: body.get("content") },
    }
  };

  return runMutation(updatePostMutation, { postInput, blobInput }, user);
}

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const body = await request.formData();
  const { error } = await updatePost(body, user!);
  if (error) {
    console.error(error);
    return new Response(null, { status: 400 });
  } else {
    return redirect(encodeURI("/dash?result=succeed&message=글을 수정했어요."));
  }
};

export default function NewPost() {
  const { site, viewer } = useLoaderData() as UpdatePostDataQuery;
  return (
    <Container className="mb-16">
      <Form method="post">
        <PostEdit site={site} post={viewer.post} />
        <div className="py-4">
          <TextButton type="submit" text="작성 완료" />
        </div>
      </Form>
    </Container>
  );
}
