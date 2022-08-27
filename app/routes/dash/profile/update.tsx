import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { useOutletContext } from "react-router";
import { UpdateProfile } from "~/components/templates/dashboard/UpdateProfile";
import type { User } from "~/lib/auth/client";
import { updateProfile } from "~/lib/auth/client";
import { getAccessKey } from "~/lib/auth/session";

export const action: ActionFunction = async ({ request }) => {
  const reqData = await request.formData();
  await updateProfile((await getAccessKey(request))!!, {
    displayName: reqData.get("displayName") as string || undefined,
    profileImage: reqData.get("profileImage") as string || undefined,
  });

  return redirect(`/dash?from=${new URL(request.url).pathname}&result=succeed`);
};

export default function Update() {
  const currentUser = useOutletContext<User>();
  return (
    <Form method="post">
      <UpdateProfile currentUser={currentUser} />
    </Form>
  );
}
