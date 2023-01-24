import type { LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { getAccessKey } from "~/lib/auth/session";
import type { User } from "~/lib/auth/client";
import { Outlet, useLoaderData } from "@remix-run/react";
import { gql } from "urql";
import { client } from "~/lib/graphql/client.server";
import Navigation from "~/components/organisms/Navigation";

type Viewer = {
  viewer: User;
};

const query = gql<Viewer>`
  query {
    viewer {
      name
      displayName
      profileImageUrl
    }
  }
`;

async function getViewer(accessKey: string): Promise<User> {
  const fetchOptions = { headers: { Authorization: `Bearer ${accessKey}` } };
  const { data } = await client.query<Viewer>(query, {}, { fetchOptions }).toPromise();
  if (!data) {
    throw new Error("Failed to get viewer");
  }
  return data.viewer;
}

export const loader: LoaderFunction = async ({ request }) => {
  const accessKey = await getAccessKey(request);
  if (!accessKey) {
    return redirect("/auth/signin");
  }

  try {
    const viewer = await getViewer(accessKey);
    return json(viewer);
  } catch (e) {
    return redirect("/auth/signout");
  }
};

export default function Dashboard() {
  const currentUser = useLoaderData<User>();
  return (
    <>
      <Navigation showDashboard={true} />
      <Outlet context={currentUser} />
    </>
  );
}
