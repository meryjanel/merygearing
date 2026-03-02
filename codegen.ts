import { CodegenConfig } from "@graphql-codegen/cli";

const codegenConfig: CodegenConfig = {
  schema: "http://localhost:3001/graphql", // 백엔드 엔드포인트
  documents: ["server/models/**/*.gql"], // 작성한 .gql 파일 위치
  generates: {
    "src/generated/graphql.tsx": {
      // 결과물이 저장될 폴더
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo", // Apollo 전용 훅 생성
        // "typescript-react-query", // 훅 생성
      ],
    },
  },
  config: {
    withHooks: true, // useQuery 같은 훅 생성 여부
    withHOC: false, // 고차 컴포넌트 제외
    withComponent: false, // 컴포넌트 형태 제외
    apolloReactCommonImportFrom: "@apollo/client",
    apolloReactHooksImportFrom: "@apollo/client",
    // reactQueryVersion: 5,
    reactApolloVersion: 3,
  },
};
export default codegenConfig;
