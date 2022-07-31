import { createClient, dedupExchange, cacheExchange, fetchExchange, debugExchange } from "urql";
import { requestPolicyExchange } from "@urql/exchange-request-policy";

export const client = createClient({
  url: "https://cms.lynlab.co.kr/graphql",
  exchanges: [
    debugExchange,
    dedupExchange,
    requestPolicyExchange({ ttl: 60_000, shouldUpgrade: () => true }),
    cacheExchange,
    fetchExchange,
  ],
});
