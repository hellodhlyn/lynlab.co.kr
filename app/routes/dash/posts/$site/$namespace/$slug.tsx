import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Form, Params, useLoaderData } from "@remix-run/react";
import type { OperationResult } from "urql";
import Container from "~/components/atoms/Container";
import TextButton from "~/components/atoms/TextButton";
import { PostEdit } from "~/components/organisms/blog/PostEdit";
import { authenticator } from "~/lib/auth/authenticator.server";
import { User } from "~/lib/auth/user";
import { runMutation, runQuery } from "~/lib/graphql/client.server";
import { PostEditData, createPostMutation, postEditQuery, updatePostMutation } from "./$slug.graphql";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  const variables = { site: params.site!, namespace: params.namespace!, slug: params.slug! };
  const { data } = await runQuery(postEditQuery, variables, user!);
  if (!data) {
    throw new Error("Failed to fetch data");
  }
  return json<PostEditData>(data);
};

function parseTags(tagInput: FormDataEntryValue | null): string[] {
  if (!tagInput || typeof tagInput !== "string") {
    return [];
  }
  return tagInput.split(" ").map((tag) => tag.replace("#", "")).filter((tag) => tag.length > 0);
}

async function createPost(params: Params, body: FormData, user: User): Promise<OperationResult> {
  const { site, namespace } = params;
  const input = {
    site, namespace,
    slug: body.get("slug"),
    title: body.get("title"),
    description: body.get("description"),
    thumbnailUrl: body.get("thumbnailUrl") || null,
    blobs: [
      {
        type: "markdown",
        markdown: { text: body.get("content") },
      },
    ],
    tags: parseTags(body.get("tags")),
    visibility: body.get("visibility"),
  };

  return runMutation(createPostMutation, { input }, user);
}

async function updatePost(params: Params, body: FormData, user: User): Promise<OperationResult> {
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

export const action: ActionFunction = async ({ params, request }) => {
  const user = await authenticator.isAuthenticated(request);
  const body = await request.formData();
  const newPost = !!body.get("slug");
  if (newPost) {
    const { error } = await createPost(params, body, user!);
    if (error) {
      console.error(error);
      return new Response(null, { status: 400 });
    } else {
      return redirect(encodeURI("/dash?result=succeed&message=새로운 글을 작성했어요."));
    }
  } else {
    const { error } = await updatePost(params, body, user!);
    if (error) {
      console.error(error);
      return new Response(null, { status: 400 });
    } else {
      return redirect(encodeURI("/dash?result=succeed&message=글을 수정했어요."));
    }
  }
};

export default function NewPost() {
  const { site, viewer } = useLoaderData<PostEditData>();
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
