import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { gql, type OperationResult } from "urql";
import Container from "~/components/atoms/Container";
import TextButton from "~/components/atoms/TextButton";
import { PostEdit } from "~/components/organisms/blog/PostEdit";
import { graphql } from "~/graphql";
import { BlobInput, BlobTypeEnum, PostVisibility, UpdatePostDataQuery, UpdatePostInput } from "~/graphql/graphql";
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
        blobs {
          id uuid type
          ... on MarkdownBlob { text }
          ... on ImageBlob { url previewUrl caption blurhash }
        }
        tags { slug name }
      }
    }
  }
`);

const updatePostMutation = gql`
  mutation UpdatePost($postInput: UpdatePostInput!) {
    updatePost(input: $postInput) {
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

async function updatePost(body: FormData, user: User): Promise<OperationResult> {
  const stringOrUndefined = (key: string): string | undefined => {
    const value = body.get(key);
    if (!value || typeof value !== "string") {
      return undefined;
    }
    return value;
  }

  function parseTags(key: string): string[] {
    const tagInput = stringOrUndefined(key);
    if (!tagInput || typeof tagInput !== "string") {
      return [];
    }
    return tagInput.split(" ").map((tag) => tag.replace("#", "")).filter((tag) => tag.length > 0);
  }

  const postInput: UpdatePostInput = {
    id: stringOrUndefined("postId")!,
    title: stringOrUndefined("title"),
    description: stringOrUndefined("description"),
    thumbnailUrl: stringOrUndefined("thumbnailUrl"),
    tags: parseTags("tags"),
    visibility: stringOrUndefined("visibility") === "public" ? PostVisibility.Public : PostVisibility.Private,
  };

  const blobs: BlobInput[] = [];
  let blobIndex = 0;
  while (body.has(`blobs.${blobIndex}.type`)) {
    const blob: BlobInput = {
      id: stringOrUndefined(`blobs.${blobIndex}.id`),
      type: BlobTypeEnum.Markdown,
    };

    const blobTypeString = stringOrUndefined(`blobs.${blobIndex}.type`);
    if (blobTypeString === "markdown") {
      blob.type = BlobTypeEnum.Markdown;
      blob.markdown = { text: stringOrUndefined(`blobs.${blobIndex}.text`) || "" };
    } else if (blobTypeString === "image") {
      blob.type = BlobTypeEnum.Image;
      blob.image = {
        url: stringOrUndefined(`blobs.${blobIndex}.url`) || "",
        previewUrl: stringOrUndefined(`blobs.${blobIndex}.previewUrl`),
        caption: stringOrUndefined(`blobs.${blobIndex}.caption`),
        blurhash: stringOrUndefined(`blobs.${blobIndex}.blurhash`),
      };
    } else {
      throw new Error(`Unexpected blob type: ${blobTypeString}`);
    }

    blobs.push(blob);
    blobIndex += 1;
  }

  if (blobs.length > 0) {
    postInput.blobs = blobs;
  }

  return runMutation(updatePostMutation, { postInput }, user);
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
        <PostEdit site={site!} post={viewer.post} />
        <div className="py-4">
          <TextButton type="submit" text="작성 완료" />
        </div>
      </Form>
    </Container>
  );
}
