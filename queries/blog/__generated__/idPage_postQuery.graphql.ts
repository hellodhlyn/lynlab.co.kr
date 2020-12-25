/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type idPage_postQueryVariables = {
    postId: number;
};
export type idPage_postQueryResponse = {
    readonly post: {
        readonly postId: number;
        readonly title: string;
        readonly description: string | null;
        readonly thumbnailUrl: string | null;
        readonly tags: ReadonlyArray<{
            readonly name: string;
        }> | null;
        readonly blobs: ReadonlyArray<{
            readonly uuid: string;
            readonly content: string;
        }> | null;
        readonly relatedPosts: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly postId: number;
                    readonly title: string;
                    readonly thumbnailUrl: string | null;
                    readonly description: string | null;
                } | null;
            } | null> | null;
        } | null;
        readonly createdAt: unknown;
    } | null;
};
export type idPage_postQuery = {
    readonly response: idPage_postQueryResponse;
    readonly variables: idPage_postQueryVariables;
};



/*
query idPage_postQuery(
  $postId: Int!
) {
  post(postId: $postId) {
    postId
    title
    description
    thumbnailUrl
    tags {
      name
    }
    blobs {
      uuid
      content
    }
    relatedPosts(first: 3) {
      edges {
        node {
          postId
          title
          thumbnailUrl
          description
          id
        }
      }
    }
    createdAt
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "postId",
    "type": "Int!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "postId",
    "variableName": "postId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "thumbnailUrl",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "PostTag",
  "kind": "LinkedField",
  "name": "tags",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "PostBlob",
  "kind": "LinkedField",
  "name": "blobs",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "uuid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "idPage_postQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "relatedPosts",
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "relatedPosts(first:3)"
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "idPage_postQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "relatedPosts",
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/),
                      (v4/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "relatedPosts(first:3)"
          },
          (v9/*: any*/),
          (v10/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "idPage_postQuery",
    "operationKind": "query",
    "text": "query idPage_postQuery(\n  $postId: Int!\n) {\n  post(postId: $postId) {\n    postId\n    title\n    description\n    thumbnailUrl\n    tags {\n      name\n    }\n    blobs {\n      uuid\n      content\n    }\n    relatedPosts(first: 3) {\n      edges {\n        node {\n          postId\n          title\n          thumbnailUrl\n          description\n          id\n        }\n      }\n    }\n    createdAt\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f053d10860b7731c0f068a9e237f193f';
export default node;
