/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

/** Autogenerated input type of AddReaction */
export type AddReactionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};

/** Autogenerated return type of AddReaction. */
export type AddReactionPayload = {
  __typename?: 'AddReactionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  reaction: Reaction;
};

export type ApiToken = {
  __typename?: 'ApiToken';
  accessKey: Scalars['String']['output'];
  refreshKey: Scalars['String']['output'];
};

/** An object with an ID. */
export type Blob = {
  /** @deprecated should use interface implementation fields instead of common `content` field */
  content?: Maybe<Scalars['String']['output']>;
  /** ID of the object. */
  id: Scalars['ID']['output'];
  type: BlobTypeEnum;
  uuid: Scalars['String']['output'];
};

export type BlobInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<ImageInput>;
  markdown?: InputMaybe<TextInput>;
  plaintext?: InputMaybe<TextInput>;
  type: BlobTypeEnum;
};

export enum BlobTypeEnum {
  Image = 'image',
  Markdown = 'markdown',
  Plaintext = 'plaintext'
}

/** Autogenerated input type of ChallengeWebAuthnAuthentication */
export type ChallengeWebAuthnAuthenticationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

/** Autogenerated return type of ChallengeWebAuthnAuthentication. */
export type ChallengeWebAuthnAuthenticationPayload = {
  __typename?: 'ChallengeWebAuthnAuthenticationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  options: Scalars['String']['output'];
};

/** Autogenerated input type of ChallengeWebAuthnRegister */
export type ChallengeWebAuthnRegisterInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of ChallengeWebAuthnRegister. */
export type ChallengeWebAuthnRegisterPayload = {
  __typename?: 'ChallengeWebAuthnRegisterPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  options: Scalars['String']['output'];
};

/** Autogenerated input type of CreateApiToken */
export type CreateApiTokenInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<GithubAuthentication>;
  webAuthn?: InputMaybe<WebAuthnAuthentication>;
};

/** Autogenerated return type of CreateApiToken. */
export type CreateApiTokenPayload = {
  __typename?: 'CreateApiTokenPayload';
  apiToken: ApiToken;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user: User;
};

/** Autogenerated input type of CreatePost */
export type CreatePostInput = {
  blobs: Array<BlobInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  namespace: Scalars['String']['input'];
  site: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  visibility?: InputMaybe<PostVisibility>;
};

/** Autogenerated return type of CreatePost. */
export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  post: Post;
};

/** Autogenerated input type of CreateTag */
export type CreateTagInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  site: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

/** Autogenerated return type of CreateTag. */
export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  tag: Tag;
};

/** Autogenerated input type of CreateWebAuthnAuthentication */
export type CreateWebAuthnAuthenticationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  credential: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of CreateWebAuthnAuthentication. */
export type CreateWebAuthnAuthenticationPayload = {
  __typename?: 'CreateWebAuthnAuthenticationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type GithubAuthentication = {
  accessToken: Scalars['String']['input'];
};

export type ImageBlob = Blob & Node & {
  __typename?: 'ImageBlob';
  blurhash?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  /** @deprecated should use interface implementation fields instead of common `content` field */
  content?: Maybe<Scalars['String']['output']>;
  /** ID of the object. */
  id: Scalars['ID']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  type: BlobTypeEnum;
  url: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

export type ImageInput = {
  blurhash?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  previewUrl?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type MarkdownBlob = Blob & Node & {
  __typename?: 'MarkdownBlob';
  /** @deprecated should use interface implementation fields instead of common `content` field */
  content?: Maybe<Scalars['String']['output']>;
  /** ID of the object. */
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  textHtml: Scalars['String']['output'];
  type: BlobTypeEnum;
  uuid: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addReaction?: Maybe<AddReactionPayload>;
  challengeWebAuthnAuthentication?: Maybe<ChallengeWebAuthnAuthenticationPayload>;
  challengeWebAuthnRegister?: Maybe<ChallengeWebAuthnRegisterPayload>;
  createApiToken?: Maybe<CreateApiTokenPayload>;
  createPost?: Maybe<CreatePostPayload>;
  createTag?: Maybe<CreateTagPayload>;
  createWebAuthnAuthentication?: Maybe<CreateWebAuthnAuthenticationPayload>;
  refreshApiToken?: Maybe<RefreshApiTokenPayload>;
  removeReaction?: Maybe<RemoveReactionPayload>;
  updateBlob?: Maybe<UpdateBlobPayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationAddReactionArgs = {
  input: AddReactionInput;
};


export type MutationChallengeWebAuthnAuthenticationArgs = {
  input: ChallengeWebAuthnAuthenticationInput;
};


export type MutationChallengeWebAuthnRegisterArgs = {
  input: ChallengeWebAuthnRegisterInput;
};


export type MutationCreateApiTokenArgs = {
  input: CreateApiTokenInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationCreateWebAuthnAuthenticationArgs = {
  input: CreateWebAuthnAuthenticationInput;
};


export type MutationRefreshApiTokenArgs = {
  input: RefreshApiTokenInput;
};


export type MutationRemoveReactionArgs = {
  input: RemoveReactionInput;
};


export type MutationUpdateBlobArgs = {
  input: UpdateBlobInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Namespace = {
  __typename?: 'Namespace';
  name: Scalars['String']['output'];
  posts: PostConnection;
  site: Site;
  slug: Scalars['String']['output'];
  tags: Array<Tag>;
};


export type NamespacePostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PlaintextBlob = Blob & Node & {
  __typename?: 'PlaintextBlob';
  /** @deprecated should use interface implementation fields instead of common `content` field */
  content?: Maybe<Scalars['String']['output']>;
  /** ID of the object. */
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  type: BlobTypeEnum;
  uuid: Scalars['String']['output'];
};

export type Post = Node & {
  __typename?: 'Post';
  author: User;
  blobs: Array<Blob>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** ID of the object. */
  id: Scalars['ID']['output'];
  namespace: Namespace;
  reactionSummary: ReactionSummary;
  site: Site;
  slug: Scalars['String']['output'];
  tags: Array<Tag>;
  thumbnailBlurhash?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  uuid: Scalars['String']['output'];
  visibility: PostVisibility;
};

/** The connection type for Post. */
export type PostConnection = {
  __typename?: 'PostConnection';
  /** A list of edges. */
  edges: Array<PostEdge>;
  /** A list of nodes. */
  nodes: Array<Post>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PostEdge = {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Post>;
};

export type PostFilter = {
  namespace?: InputMaybe<Scalars['String']['input']>;
  site?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<StringFieldFilter>;
};

export enum PostVisibility {
  Private = 'private',
  Public = 'public'
}

export type Query = {
  __typename?: 'Query';
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  post?: Maybe<Post>;
  site?: Maybe<Site>;
  sites: Array<Site>;
  user?: Maybe<User>;
  viewer: Viewer;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryPostArgs = {
  namespace?: InputMaybe<Scalars['String']['input']>;
  site?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySiteArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  name: Scalars['String']['input'];
};

export type Reaction = {
  __typename?: 'Reaction';
  content: Scalars['String']['output'];
  post: Post;
  user: User;
};

/** The connection type for Reaction. */
export type ReactionConnection = {
  __typename?: 'ReactionConnection';
  /** A list of edges. */
  edges: Array<ReactionEdge>;
  /** A list of nodes. */
  nodes: Array<Reaction>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ReactionCount = {
  __typename?: 'ReactionCount';
  content: Scalars['String']['output'];
  count: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ReactionEdge = {
  __typename?: 'ReactionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Reaction>;
};

export type ReactionSummary = {
  __typename?: 'ReactionSummary';
  countByContent: Array<ReactionCount>;
  totalCount: Scalars['Int']['output'];
  viewerReactions: Array<Reaction>;
};

/** Autogenerated input type of RefreshApiToken */
export type RefreshApiTokenInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  refreshKey: Scalars['String']['input'];
};

/** Autogenerated return type of RefreshApiToken. */
export type RefreshApiTokenPayload = {
  __typename?: 'RefreshApiTokenPayload';
  accessKey: Scalars['String']['output'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  refreshKey: Scalars['String']['output'];
};

/** Autogenerated input type of RemoveReaction */
export type RemoveReactionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};

/** Autogenerated return type of RemoveReaction. */
export type RemoveReactionPayload = {
  __typename?: 'RemoveReactionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  reaction?: Maybe<Reaction>;
};

export type Site = {
  __typename?: 'Site';
  name: Scalars['String']['output'];
  namespace?: Maybe<Namespace>;
  namespaces: Array<Namespace>;
  slug: Scalars['String']['output'];
};


export type SiteNamespaceArgs = {
  slug: Scalars['String']['input'];
};

export enum Sort {
  CreatedAsc = 'CREATED_ASC',
  CreatedDesc = 'CREATED_DESC'
}

export type StringFieldFilter = {
  contain?: InputMaybe<Scalars['String']['input']>;
  equal?: InputMaybe<Scalars['String']['input']>;
  startWith?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String']['output'];
  posts: PostConnection;
  slug: Scalars['String']['output'];
};


export type TagPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
};

export type TextInput = {
  text: Scalars['String']['input'];
};

/** Autogenerated input type of UpdateBlob */
export type UpdateBlobInput = {
  blob: BlobInput;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Autogenerated return type of UpdateBlob. */
export type UpdateBlobPayload = {
  __typename?: 'UpdateBlobPayload';
  blob: Blob;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of UpdatePost */
export type UpdatePostInput = {
  blobs?: InputMaybe<Array<BlobInput>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<PostVisibility>;
};

/** Autogenerated return type of UpdatePost. */
export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  post: Post;
};

/** Autogenerated input type of UpdateUser */
export type UpdateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of UpdateUser. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type User = {
  __typename?: 'User';
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  posts: PostConnection;
  profileImageUrl?: Maybe<Scalars['String']['output']>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};


export type UserPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
};

export type Viewer = {
  __typename?: 'Viewer';
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  post?: Maybe<Post>;
  posts: PostConnection;
  profileImageUrl?: Maybe<Scalars['String']['output']>;
  reactions?: Maybe<ReactionConnection>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};


export type ViewerPostArgs = {
  namespace?: InputMaybe<Scalars['String']['input']>;
  site?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};


export type ViewerPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
};


export type ViewerReactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
};

export type WebAuthnAuthentication = {
  credential: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateApiTokenMutationVariables = Exact<{
  input: CreateApiTokenInput;
}>;


export type CreateApiTokenMutation = { __typename?: 'Mutation', createApiToken?: { __typename?: 'CreateApiTokenPayload', apiToken: { __typename?: 'ApiToken', accessKey: string, refreshKey: string } } | null };

export type PostViewQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type PostViewQuery = { __typename?: 'Query', post?: { __typename?: 'Post', title: string, slug: string, description?: string | null, thumbnailUrl?: string | null, createdAt: any, blobs: Array<{ __typename?: 'ImageBlob', url: string, previewUrl?: string | null, caption?: string | null, uuid: string, type: BlobTypeEnum } | { __typename?: 'MarkdownBlob', text: string, uuid: string, type: BlobTypeEnum } | { __typename?: 'PlaintextBlob', uuid: string, type: BlobTypeEnum }>, tags: Array<{ __typename?: 'Tag', slug: string, name: string, posts: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', title: string, slug: string, description?: string | null, thumbnailUrl?: string | null, createdAt: any }> } }> } | null };

export type DashboardIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardIndexQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', slug: string, namespaces: Array<{ __typename?: 'Namespace', slug: string, site: { __typename?: 'Site', slug: string } }> }> };

export type UpdatePostDataQueryVariables = Exact<{
  site: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
  slug: Scalars['String']['input'];
}>;


export type UpdatePostDataQuery = { __typename?: 'Query', site?: { __typename?: 'Site', slug: string, namespace?: { __typename?: 'Namespace', slug: string, tags: Array<{ __typename?: 'Tag', slug: string, name: string }> } | null } | null, viewer: { __typename?: 'Viewer', post?: { __typename?: 'Post', id: string, slug: string, title: string, description?: string | null, thumbnailUrl?: string | null, visibility: PostVisibility, blobs: Array<{ __typename?: 'ImageBlob', url: string, previewUrl?: string | null, caption?: string | null, blurhash?: string | null, id: string, uuid: string, type: BlobTypeEnum } | { __typename?: 'MarkdownBlob', text: string, id: string, uuid: string, type: BlobTypeEnum } | { __typename?: 'PlaintextBlob', id: string, uuid: string, type: BlobTypeEnum }>, tags: Array<{ __typename?: 'Tag', slug: string, name: string }> } | null } };

export type UpdatePostMutationVariables = Exact<{
  postInput: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'UpdatePostPayload', clientMutationId?: string | null } | null };

export type DashboardSiteQueryVariables = Exact<{
  site: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
}>;


export type DashboardSiteQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', slug: string, namespaces: Array<{ __typename?: 'Namespace', slug: string }> }>, viewer: { __typename?: 'Viewer', posts: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', slug: string, title: string, visibility: PostVisibility, createdAt: any, site: { __typename?: 'Site', slug: string }, namespace: { __typename?: 'Namespace', slug: string } }> } } };

export type CreatePostDataQueryVariables = Exact<{
  site: Scalars['String']['input'];
  namespace: Scalars['String']['input'];
}>;


export type CreatePostDataQuery = { __typename?: 'Query', site?: { __typename?: 'Site', slug: string, namespace?: { __typename?: 'Namespace', slug: string, tags: Array<{ __typename?: 'Tag', slug: string, name: string }> } | null } | null };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'CreatePostPayload', post: { __typename?: 'Post', slug: string } } | null };


export const CreateApiTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateApiToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateApiTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createApiToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apiToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessKey"}},{"kind":"Field","name":{"kind":"Name","value":"refreshKey"}}]}}]}}]}}]} as unknown as DocumentNode<CreateApiTokenMutation, CreateApiTokenMutationVariables>;
export const PostViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"StringValue","value":"lynlab.co.kr","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"namespace"},"value":{"kind":"StringValue","value":"blog","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"blobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MarkdownBlob"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageBlob"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"previewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"4"}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"CREATED_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PostViewQuery, PostViewQueryVariables>;
export const DashboardIndexDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardIndex"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardIndexQuery, DashboardIndexQueryVariables>;
export const UpdatePostDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UpdatePostData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"namespace"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"namespace"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"Argument","name":{"kind":"Name","value":"namespace"},"value":{"kind":"Variable","name":{"kind":"Name","value":"namespace"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"blobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MarkdownBlob"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageBlob"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"previewUrl"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePostDataQuery, UpdatePostDataQueryVariables>;
export const UpdatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientMutationId"}}]}}]}}]} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>;
export const DashboardSiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardSite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"namespace"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"IntValue","value":"999"}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"CREATED_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"site"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"namespace"},"value":{"kind":"Variable","name":{"kind":"Name","value":"namespace"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DashboardSiteQuery, DashboardSiteQueryVariables>;
export const CreatePostDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreatePostData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"site"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"namespace"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"site"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"namespace"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreatePostDataQuery, CreatePostDataQueryVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;