import type {
  TypedDocumentNode,
  AnyVariables, OperationContext, OperationResult,
} from "urql";
import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  debugExchange,
} from "urql";
import { requestPolicyExchange } from "@urql/exchange-request-policy";
import type { DocumentNode } from "graphql/language";
import { getAccessKey } from "~/lib/auth/session";

const URL = "https://cms.lynlab.co.kr/graphql";

export const client = createClient({
  url: URL,
  exchanges: [
    debugExchange,
    dedupExchange,
    requestPolicyExchange({ ttl: 60_000, shouldUpgrade: () => true }),
    cacheExchange,
    fetchExchange,
  ],
});

export const noCacheClient = createClient({
  url: URL,
  exchanges: [
    debugExchange,
    fetchExchange,
  ],
});

async function prepareContext(request?: Request): Promise<Partial<OperationContext>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (request) {
    headers.Authorization = `Bearer ${await getAccessKey(request)}`;
  }

  return {
    fetchOptions: { headers },
  };
}

export async function runQuery<Data = any, Variables extends AnyVariables = AnyVariables>(
  query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
  variables: Variables,
  request?: Request,
): Promise<OperationResult<Data, Variables>> {
  const useClient = request ? noCacheClient : client;
  return useClient.query<Data, Variables>(query, variables, await prepareContext(request)).toPromise();
}

export async function runMutation<Data = any, Variables extends AnyVariables = AnyVariables>(
  query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
  variables: Variables,
  request?: Request,
): Promise<OperationResult<Data, Variables>> {
  const useClient = request ? noCacheClient : client;
  return useClient.mutation<Data, Variables>(query, variables, await prepareContext(request)).toPromise();
}
