import { createCloudflareKVSessionStorage, createCookie } from "@remix-run/cloudflare";

const accessKeyKey = "accessKey";
const refreshKeyKey = "refreshKey";

const sessionCookie = createCookie("__session", {
  secure: true,
});

const { getSession, commitSession, destroySession } = createCloudflareKVSessionStorage({
  kv: __KV_SESSIONS,
  cookie: sessionCookie,
});

export async function hasAccessKey(request: Request): Promise<boolean> {
  const session = await getSession(request.headers.get("Cookie"));
  return session.has(accessKeyKey);
}

export async function getAccessKey(request: Request): Promise<string | null> {
  const session = await getSession(request.headers.get("Cookie"));
  if (await hasAccessKey(request)) {
    return session.get(accessKeyKey) as string;
  }
  return null;
}

export async function setKeys(request: Request, accessKey: string, refreshKey: string): Promise<string> {
  const session = await getSession(request.headers.get("Cookie"));
  session.set(accessKeyKey, accessKey);
  session.set(refreshKeyKey, refreshKey);
  return commitSession(session);
}

export async function deleteAccessKey(request: Request): Promise<string> {
  const session = await getSession(request.headers.get("Cookie"));
  return destroySession(session);
}
