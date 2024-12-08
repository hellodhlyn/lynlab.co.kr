import { SessionStorage, createCookieSessionStorage } from "@remix-run/cloudflare";
import { Env } from "~/env";
import { User } from "./user";

let _sessionStorage: SessionStorage;

export function getSessionStorage(env: Env): SessionStorage {
  if (_sessionStorage) {
    return _sessionStorage;
  }

  _sessionStorage = createCookieSessionStorage({
    cookie: {
      name: "__session",
      path: "/",
      httpOnly: true,
      secure: env.SITE_HOST.startsWith("https://"),
      secrets: [env.SESSION_SECRET],
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    },
  });
  return _sessionStorage;
}

export async function getSessionUser(env: Env, request: Request): Promise<User | null> {
  const session = await getSessionStorage(env).getSession(request.headers.get("Cookie"));
  return session.get("user") ?? null;
}
