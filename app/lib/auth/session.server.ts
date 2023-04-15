import { createCookie, createWorkersKVSessionStorage } from "@remix-run/cloudflare";

const accessKeyKey = "accessKey";
const refreshKeyKey = "refreshKey";

const sessionCookie = createCookie("__session", {
  secure: SITE_HOST?.startsWith("https://") === true,
});

export const sessionStorage = createWorkersKVSessionStorage({
  kv: __KV_SESSIONS,
  cookie: sessionCookie,
});

const { getSession, commitSession, destroySession } = sessionStorage;

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
