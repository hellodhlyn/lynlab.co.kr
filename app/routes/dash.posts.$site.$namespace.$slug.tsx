import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { gql, type OperationResult } from "urql";
import Container from "~/components/atoms/Container";
import TextButton from "~/components/atoms/TextButton";
import { graphql } from "~/graphql";
import { PostVisibility, UpdatePostDataQuery, UpdatePostInput } from "~/graphql/graphql";
import { authenticator } from "~/lib/auth/authenticator.server";
import { User } from "~/lib/auth/user";
import { runMutation, runQuery } from "~/lib/graphql/client.server";
import { getBlobsFromInput, parseTags, stringOrUndefinedFunc } from "~/lib/dash/posts";
import { Env } from "~/env";
import { PostEdit } from "~/components/organisms/dashboard";

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

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const user = await authenticator(context.env as Env).isAuthenticated(request);
  const variables = { site: params.site!, namespace: params.namespace!, slug: params.slug! };
  const { data } = await runQuery(updatePostQuery, variables, user!);
  if (!data) {
    throw new Error("Failed to fetch data");
  }
  return json(data);
};

async function updatePost(body: FormData, user: User): Promise<OperationResult> {
  const stringOrUndefined = stringOrUndefinedFunc(body);

  const postInput: UpdatePostInput = {
    id: stringOrUndefined("postId")!,
    title: stringOrUndefined("title"),
    description: stringOrUndefined("description"),
    thumbnailUrl: stringOrUndefined("thumbnailUrl"),
    tags: parseTags(body),
    visibility: stringOrUndefined("visibility") === "public" ? PostVisibility.Public : PostVisibility.Private,
  };

  const blobs = getBlobsFromInput(body);
  if (blobs.length > 0) {
    postInput.blobs = blobs;
  }

  return runMutation(updatePostMutation, { postInput }, user);
}

export const action: ActionFunction = async ({ request, context }) => {
  const user = await authenticator(context.env as Env).isAuthenticated(request);
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
