import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://cms.lynlab.co.kr/graphql",
  documents: ["app/**/*.{ts,tsx}"],
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
