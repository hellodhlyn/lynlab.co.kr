/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation SignInWithGitHub ($github: GithubAuthentication!) {\n    createApiToken(input: { github: $github }) {\n      apiToken { accessKey refreshKey }\n      user { name displayName profileImageUrl }\n    }\n  }\n": types.SignInWithGitHubDocument,
    "\n  query Feed ($namespace: String!) {\n    site(slug: \"lynlab.co.kr\") {\n      namespace(slug: $namespace) {\n        posts(last: 1000) {\n          nodes {\n            title\n            slug\n            description\n            updatedAt\n            thumbnailUrl\n          }\n        }\n      }\n    }\n  }\n": types.FeedDocument,
    "\n  query HomePosts {\n    site(slug: \"lynlab.co.kr\") {\n      namespace(slug: \"blog\") {\n        posts(first: 8, sort: CREATED_DESC) {\n          edges {\n            node {\n              slug title description thumbnailUrl thumbnailBlurhash\n            }\n          }\n        }\n      }\n    }\n  }\n": types.HomePostsDocument,
    "\n  query PostView($slug: String!) {\n    post(site: \"lynlab.co.kr\", namespace: \"blog\", slug: $slug) {\n      title slug description thumbnailUrl createdAt\n      blobs {\n        uuid type\n        ... on MarkdownBlob { text }\n        ... on ImageBlob { url previewUrl caption }\n      }\n      tags {\n        slug name\n        posts(first: 4, sort: CREATED_DESC) {\n          nodes {\n            title slug description thumbnailUrl createdAt\n          }\n        }\n      }\n    }\n  }\n": types.PostViewDocument,
    "\n  query BlogIndex ($before: String, $after: String, $first: Int, $last: Int, $filter: PostFilter) {\n    site(slug: \"lynlab.co.kr\") {\n      namespace(slug: \"blog\") {\n        posts(before: $before, after: $after, first: $first, last: $last, filter: $filter) {\n          edges {\n            cursor\n            node {\n              slug\n              title\n              description\n              thumbnailUrl\n              thumbnailBlurhash\n              createdAt\n              tags { slug name }\n            }\n          }\n          pageInfo {\n            hasPreviousPage hasNextPage startCursor endCursor\n          }\n        }\n      }\n    }\n  }\n": types.BlogIndexDocument,
    "\n  query DashboardIndex {\n    sites {\n      slug\n      namespaces {\n        site { slug }\n        slug\n      }\n    }\n  }\n": types.DashboardIndexDocument,
    "\n  query UpdatePostData($site: String!, $namespace: String!, $slug: String!) {\n    site(slug: $site) {\n      slug\n      namespace(slug: $namespace) {\n        slug\n        tags { slug name }\n      }\n    }\n    viewer {\n      post(site: $site, namespace: $namespace, slug: $slug) {\n        id slug title description thumbnailUrl visibility\n        blobs {\n          id uuid type\n          ... on MarkdownBlob { text }\n          ... on ImageBlob { url previewUrl caption blurhash }\n        }\n        tags { slug name }\n      }\n    }\n  }\n": types.UpdatePostDataDocument,
    "\n  mutation UpdatePost($postInput: UpdatePostInput!) {\n    updatePost(input: $postInput) {\n      clientMutationId\n    }\n  }\n": types.UpdatePostDocument,
    "\n  query DashboardSite($site: String!, $namespace: String!) {\n    sites {\n      slug\n      namespaces { slug }\n    }\n    viewer {\n      posts(last: 999, sort: CREATED_DESC, filter: { site: $site, namespace: $namespace }) {\n        nodes {\n          site { slug }\n          namespace { slug }\n          slug\n          title\n          visibility\n          createdAt\n        }\n      }\n    }\n  }\n": types.DashboardSiteDocument,
    "\n  query CreatePostData($site: String!, $namespace: String!) {\n    site(slug: $site) {\n      slug\n      namespace(slug: $namespace) {\n        slug\n        tags { slug name }\n      }\n    }\n  }\n": types.CreatePostDataDocument,
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      post { slug }\n    }\n  }\n": types.CreatePostDocument,
    "\n  query HobbyIndex ($featuredContentSlugs: [String!]) {\n    featuredContents(slugs: $featuredContentSlugs) {\n      slug\n      title\n      description\n      posts(sort: CREATED_DESC) {\n        nodes {\n          site { slug }\n          namespace { slug }\n          slug\n          title\n          description\n          thumbnailBlurhash\n          thumbnailUrl\n        }\n      }\n    }\n  }\n": types.HobbyIndexDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignInWithGitHub ($github: GithubAuthentication!) {\n    createApiToken(input: { github: $github }) {\n      apiToken { accessKey refreshKey }\n      user { name displayName profileImageUrl }\n    }\n  }\n"): (typeof documents)["\n  mutation SignInWithGitHub ($github: GithubAuthentication!) {\n    createApiToken(input: { github: $github }) {\n      apiToken { accessKey refreshKey }\n      user { name displayName profileImageUrl }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Feed ($namespace: String!) {\n    site(slug: \"lynlab.co.kr\") {\n      namespace(slug: $namespace) {\n        posts(last: 1000) {\n          nodes {\n            title\n            slug\n            description\n            updatedAt\n            thumbnailUrl\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Feed ($namespace: String!) {\n    site(slug: \"lynlab.co.kr\") {\n      namespace(slug: $namespace) {\n        posts(last: 1000) {\n          nodes {\n            title\n            slug\n            description\n            updatedAt\n            thumbnailUrl\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HomePosts {\n    site(slug: \"lynlab.co.kr\") {\n      namespace(slug: \"blog\") {\n        posts(first: 8, sort: CREATED_DESC) {\n          edges {\n            node {\n              slug title description thumbnailUrl thumbnailBlurhash\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query HomePosts {\n    site(slug: \"lynlab.co.kr\") {\n      namespace(slug: \"blog\") {\n        posts(first: 8, sort: CREATED_DESC) {\n          edges {\n            node {\n              slug title description thumbnailUrl thumbnailBlurhash\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostView($slug: String!) {\n    post(site: \"lynlab.co.kr\", namespace: \"blog\", slug: $slug) {\n      title slug description thumbnailUrl createdAt\n      blobs {\n        uuid type\n        ... on MarkdownBlob { text }\n        ... on ImageBlob { url previewUrl caption }\n      }\n      tags {\n        slug name\n        posts(first: 4, sort: CREATED_DESC) {\n          nodes {\n            title slug description thumbnailUrl createdAt\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PostView($slug: String!) {\n    post(site: \"lynlab.co.kr\", namespace: \"blog\", slug: $slug) {\n      title slug description thumbnailUrl createdAt\n      blobs {\n        uuid type\n        ... on MarkdownBlob { text }\n        ... on ImageBlob { url previewUrl caption }\n      }\n      tags {\n        slug name\n        posts(first: 4, sort: CREATED_DESC) {\n          nodes {\n            title slug description thumbnailUrl createdAt\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BlogIndex ($before: String, $after: String, $first: Int, $last: Int, $filter: PostFilter) {\n    site(slug: \"lynlab.co.kr\") {\n      namespace(slug: \"blog\") {\n        posts(before: $before, after: $after, first: $first, last: $last, filter: $filter) {\n          edges {\n            cursor\n            node {\n              slug\n              title\n              description\n              thumbnailUrl\n              thumbnailBlurhash\n              createdAt\n              tags { slug name }\n            }\n          }\n          pageInfo {\n            hasPreviousPage hasNextPage startCursor endCursor\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query BlogIndex ($before: String, $after: String, $first: Int, $last: Int, $filter: PostFilter) {\n    site(slug: \"lynlab.co.kr\") {\n      namespace(slug: \"blog\") {\n        posts(before: $before, after: $after, first: $first, last: $last, filter: $filter) {\n          edges {\n            cursor\n            node {\n              slug\n              title\n              description\n              thumbnailUrl\n              thumbnailBlurhash\n              createdAt\n              tags { slug name }\n            }\n          }\n          pageInfo {\n            hasPreviousPage hasNextPage startCursor endCursor\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DashboardIndex {\n    sites {\n      slug\n      namespaces {\n        site { slug }\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query DashboardIndex {\n    sites {\n      slug\n      namespaces {\n        site { slug }\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UpdatePostData($site: String!, $namespace: String!, $slug: String!) {\n    site(slug: $site) {\n      slug\n      namespace(slug: $namespace) {\n        slug\n        tags { slug name }\n      }\n    }\n    viewer {\n      post(site: $site, namespace: $namespace, slug: $slug) {\n        id slug title description thumbnailUrl visibility\n        blobs {\n          id uuid type\n          ... on MarkdownBlob { text }\n          ... on ImageBlob { url previewUrl caption blurhash }\n        }\n        tags { slug name }\n      }\n    }\n  }\n"): (typeof documents)["\n  query UpdatePostData($site: String!, $namespace: String!, $slug: String!) {\n    site(slug: $site) {\n      slug\n      namespace(slug: $namespace) {\n        slug\n        tags { slug name }\n      }\n    }\n    viewer {\n      post(site: $site, namespace: $namespace, slug: $slug) {\n        id slug title description thumbnailUrl visibility\n        blobs {\n          id uuid type\n          ... on MarkdownBlob { text }\n          ... on ImageBlob { url previewUrl caption blurhash }\n        }\n        tags { slug name }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePost($postInput: UpdatePostInput!) {\n    updatePost(input: $postInput) {\n      clientMutationId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePost($postInput: UpdatePostInput!) {\n    updatePost(input: $postInput) {\n      clientMutationId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DashboardSite($site: String!, $namespace: String!) {\n    sites {\n      slug\n      namespaces { slug }\n    }\n    viewer {\n      posts(last: 999, sort: CREATED_DESC, filter: { site: $site, namespace: $namespace }) {\n        nodes {\n          site { slug }\n          namespace { slug }\n          slug\n          title\n          visibility\n          createdAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query DashboardSite($site: String!, $namespace: String!) {\n    sites {\n      slug\n      namespaces { slug }\n    }\n    viewer {\n      posts(last: 999, sort: CREATED_DESC, filter: { site: $site, namespace: $namespace }) {\n        nodes {\n          site { slug }\n          namespace { slug }\n          slug\n          title\n          visibility\n          createdAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CreatePostData($site: String!, $namespace: String!) {\n    site(slug: $site) {\n      slug\n      namespace(slug: $namespace) {\n        slug\n        tags { slug name }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CreatePostData($site: String!, $namespace: String!) {\n    site(slug: $site) {\n      slug\n      namespace(slug: $namespace) {\n        slug\n        tags { slug name }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      post { slug }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      post { slug }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HobbyIndex ($featuredContentSlugs: [String!]) {\n    featuredContents(slugs: $featuredContentSlugs) {\n      slug\n      title\n      description\n      posts(sort: CREATED_DESC) {\n        nodes {\n          site { slug }\n          namespace { slug }\n          slug\n          title\n          description\n          thumbnailBlurhash\n          thumbnailUrl\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query HobbyIndex ($featuredContentSlugs: [String!]) {\n    featuredContents(slugs: $featuredContentSlugs) {\n      slug\n      title\n      description\n      posts(sort: CREATED_DESC) {\n        nodes {\n          site { slug }\n          namespace { slug }\n          slug\n          title\n          description\n          thumbnailBlurhash\n          thumbnailUrl\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;