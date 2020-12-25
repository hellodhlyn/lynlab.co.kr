import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import {
  Environment, Network, RecordSource, Store,
} from 'relay-runtime';

async function fetchQuery(operation, variables) {
  const res = await fetch(process.env.NEXT_PUBLIC_RELAY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; encode=utf-8',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });
  return res.json();
}

let relayEnvironment: Environment;

export function initEnvironment(records?: RecordMap): Environment {
  const environment = relayEnvironment ?? new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
  if (records) {
    environment.getStore().publish(new RecordSource(records));
  }

  if (typeof window === 'undefined') {
    return environment;
  }
  if (!relayEnvironment) {
    relayEnvironment = environment;
  }

  return environment;
}
