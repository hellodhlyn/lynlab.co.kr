/* eslint-disable @typescript-eslint/naming-convention */

export {};

declare global {
  const __KV_SESSIONS: KVNamespace;

  const SITE_HOST: string | undefined;

  const GITHUB_CLIENT_ID: string | undefined;
  const GITHUB_CLIENT_SECRET: string | undefined;
}
