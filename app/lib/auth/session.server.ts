import { SessionStorage, createCookieSessionStorage } from "@remix-run/cloudflare";
import { Env } from "~/env";

let _sessionStorage: SessionStorage;

export function sessionStorage(env: Env): SessionStorage {
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
