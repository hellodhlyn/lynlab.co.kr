import { type PlatformProxy } from "wrangler";
import { Env } from "~/env";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;
type LoadContext = {
  cloudflare: Cloudflare,
};

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

export function getLoadContext({
  context,
}: {
  request: Request;
  context: LoadContext;
}) {
  return {
    ...context,
    env: context.cloudflare.env,
  };
}
