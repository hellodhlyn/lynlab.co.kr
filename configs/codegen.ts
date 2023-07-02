import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://cms.lynlab.co.kr/graphql",
  documents: ["app/routes/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./app/graphql/": {
      preset: "client",
      config: {
        useTypeImports: true
      },
      plugins: [],
    },
  },
};

export default config;
