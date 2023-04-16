import type {
  TypedDocumentNode,
  AnyVariables, OperationContext, OperationResult,
} from "urql";
import {
  createClient,
  cacheExchange,
  fetchExchange,
  debugExchange,
} from "urql";
import { requestPolicyExchange } from "@urql/exchange-request-policy";
import type { DocumentNode } from "graphql/language";
import { User } from "../auth/user";

const URL = "https://cms.lynlab.co.kr/graphql";

export const client = createClient({
  url: URL,
  exchanges: [
    debugExchange,
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

async function prepareContext(user?: User): Promise<Partial<OperationContext>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (user) {
    headers.Authorization = `Bearer ${user.apiToken.accessKey}`;
  }

  return {
    fetchOptions: { headers },
  };
}

export async function runQuery<Data = any, Variables extends AnyVariables = AnyVariables>(
  query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
  variables: Variables,
  user?: User,
): Promise<OperationResult<Data, Variables>> {
  const useClient = user ? noCacheClient : client;
  return useClient.query<Data, Variables>(query, variables, await prepareContext(user)).toPromise();
}

export async function runMutation<Data = any, Variables extends AnyVariables = AnyVariables>(
  query: DocumentNode | TypedDocumentNode<Data, Variables> | string,
  variables: Variables,
  user?: User,
): Promise<OperationResult<Data, Variables>> {
  const useClient = user ? noCacheClient : client;
  return useClient.mutation<Data, Variables>(query, variables, await prepareContext(user)).toPromise();
}
