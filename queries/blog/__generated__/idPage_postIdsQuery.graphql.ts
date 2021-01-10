/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type idPage_postIdsQueryVariables = {};
export type idPage_postIdsQueryResponse = {
    readonly posts: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly postId: number;
            } | null;
        } | null> | null;
    };
};
export type idPage_postIdsQuery = {
    readonly response: idPage_postIdsQueryResponse;
    readonly variables: idPage_postIdsQueryVariables;
};



/*
query idPage_postIdsQuery {
  posts(first: 9999) {
    edges {
      node {
        postId
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 9999
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "idPage_postIdsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "PostConnection",
        "kind": "LinkedField",
        "name": "posts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Post",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "posts(first:9999)"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "idPage_postIdsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "PostConnection",
        "kind": "LinkedField",
        "name": "posts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Post",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "posts(first:9999)"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "idPage_postIdsQuery",
    "operationKind": "query",
    "text": "query idPage_postIdsQuery {\n  posts(first: 9999) {\n    edges {\n      node {\n        postId\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a8492e986c7d58985e506e43970e1673';
export default node;
