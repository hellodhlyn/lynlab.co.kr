import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://cms.lynlab.co.kr/graphql",
  documents: ["app/**/*.{ts,tsx}"],
  config: {
    scalars: {
      ISO8601DateTime: "Date",
    },
  },
  ignoreNoDocuments: true,
  generates: {
    "./app/graphql/": {
      preset: "client",
      config: {
        useTypeImports: true,
        avoidOptionals: {
          field: true,
          object: false,
          inputValue: false,
          defaultValue: false,
        },
      },
    },
  },
};

export default config;
