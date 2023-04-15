import { Link, useLoaderData, useOutletContext, useSearchParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import Alert from "~/components/atoms/blobs/Alert";
import Container from "~/components/atoms/Container";
import { ProfileInfo } from "~/components/organisms/dashboard/ProfileInfo";
import { runQuery } from "~/lib/graphql/client.server";
import type { User } from "~/lib/auth/user";
import { IndexData, indexQuery } from "./index.graphql";
import { authenticator } from "~/lib/auth/authenticator.server";
import { PostList } from "~/components/organisms/dashboard/PostList";
import Header from "~/components/atoms/Header";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const { data, error } = await runQuery(indexQuery, undefined, user!);
  if (!data || error) {
    throw new Error(`Failed to get data: ${error}`);
  }

  data.viewer.posts.nodes = data.viewer.posts.nodes
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return json<IndexData>(data);
};

export default function DashboardIndex() {
  const { viewer } = useLoaderData<IndexData>();

  const [searchParams] = useSearchParams();
  const redirectedResult = searchParams.get("result");
  const redirectedMessage = searchParams.get("message");

  const currentUser = useOutletContext<User>();
  return (
    <>
      {(redirectedResult === "succeed") && (
        <Container>
          <Alert color="green" icon="✅" content={redirectedMessage || "요청을 성공적으로 처리했어요."} />
        </Container>
      )}
      <ProfileInfo currentUser={currentUser} />
      <div className="py-8" />
      <Container className="mb-16">
        <Header text="게시글 관리" />
        <PostList posts={viewer.posts.nodes} />
      </Container>
    </>
  );
}
