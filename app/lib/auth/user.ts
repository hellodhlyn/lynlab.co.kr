export type User = {
  name: string;
  displayName: string;
  profileImageUrl: string | null;
  apiToken: {
    accessKey: string;
    refreshKey: string;
  };
};
