import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Form, Params, useLoaderData } from "@remix-run/react";
import type { OperationResult } from "urql";
import Container from "~/components/atoms/Container";
import TextButton from "~/components/atoms/TextButton";
import { graphql } from "~/graphql";
import { CreatePostDataQuery, CreatePostInput, PostVisibility } from "~/graphql/graphql";
import { authenticator } from "~/lib/auth/authenticator.server";
import { User } from "~/lib/auth/user";
import { runMutation, runQuery } from "~/lib/graphql/client.server";
import { getBlobsFromInput, parseTags, stringOrUndefinedFunc } from "~/lib/dash/posts";
import { Env } from "~/env";
import { PostEdit } from "~/components/organisms/dashboard";

const createPostQuery = graphql(`
  query CreatePostData($site: String!, $namespace: String!) {
    site(slug: $site) {
      slug
      namespace(slug: $namespace) {
        slug
        tags { slug name }
      }
    }
  }
`);

const createPostMutation = graphql(`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      post { slug }
    }
  }
`);

async function createPost(params: Params, body: FormData, user: User): Promise<OperationResult> {
  const stringOrUndefined = stringOrUndefinedFunc(body);

  const { site, namespace } = params;
  const input: CreatePostInput = {
    site: site!,
    namespace: namespace!,
    title: stringOrUndefined("title")!,
    slug: stringOrUndefined("slug")!,
    description: stringOrUndefined("description"),
    thumbnailUrl: stringOrUndefined("thumbnailUrl"),
    tags: parseTags(body),
    visibility: stringOrUndefined("visibility") === "public" ? PostVisibility.Public : PostVisibility.Private,
    blobs: getBlobsFromInput(body),
  }

  return runMutation(createPostMutation, { input }, user);
}

export const loader: LoaderFunction = async ({ params }) => {
  const { site, namespace } = params;
  const { data } = await runQuery(createPostQuery, { site: site!, namespace: namespace! });
  return data;
};

export const action: ActionFunction = async ({ params, request, context }) => {
  const user = await authenticator(context.env as Env).isAuthenticated(request);
  const body = await request.formData();
  const { error } = await createPost(params, body, user!);
  if (error) {
    console.error(error);
    return new Response(null, { status: 400 });
  } else {
    return redirect(encodeURI("/dash?result=succeed&message=새로운 글을 작성했어요."));
  }
};

export default function NewPost() {
  const { site } = useLoaderData() as CreatePostDataQuery;
  return (
    <Container className="mb-16">
      <Form method="post">
        <PostEdit site={site!} />
        <div className="py-4">
          <TextButton type="submit" text="작성 완료" />
        </div>
      </Form>
    </Container>
  );
}
