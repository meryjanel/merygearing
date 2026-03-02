import express, { Request, Response } from "express";
import { DataSource } from "typeorm";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { json } from "body-parser";

import { applyMiddleware } from "graphql-middleware";
import { buildSchemaSync, NonEmptyArray } from "type-graphql";
import { DateTimeResolver } from "graphql-scalars";

import * as path from "path";
import { sync } from "glob";
import cors from "cors";
import ConnectionService from "./lib/connectionService";

import cookieParser from "cookie-parser";

// graphql resolver에 해당하는 모든 파일 가져오기
// const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
//   (__dirname + "/models/**/*.resolver.{ts,js}").replace(/\\/g, "/"),
// ] as unknown as [Function, ...Function[]];
// 하던 방식이 안되서 아래로 변경

const getResolvers = () => {
  // 1. glob 패턴으로 모든 .resolver.ts(또는 .js) 파일 경로 탐색
  // 경로 예시: model/user/resolvers/user.resolver.ts
  const resolverFiles = sync(
    path.join(__dirname, "/models/**/*.resolver.{ts,js}").replace(/\\/g, "/"),
  );

  const resolvers: Function[] = [];

  resolverFiles.forEach((file) => {
    // 2. 각 파일을 실제로 불러옴 (CommonJS require 사용)
    const module = require(file);

    // 3. 모듈 내에서 클래스(함수)만 골라내기
    Object.values(module).forEach((value) => {
      // 클래스(함수)이고, @Resolver() 데코레이터가 붙은 것들을 추출
      if (typeof value === "function") {
        resolvers.push(value);
      }
    });
  });

  return resolvers;
};

//

// resolver에 해당하는 모오든 파일을 graphql resolver로 선언
const schema = applyMiddleware(
  buildSchemaSync({
    // resolvers
    resolvers: getResolvers() as [Function, ...Function[]],
    validate: { forbidUnknownValues: false },
    // emitSchemaFile: path.resolve(__dirname, "generated/schema.gql"),
    // authChecker: resolverAuthChecker,
    scalarsMap: [{ type: Date, scalar: DateTimeResolver }],
  }),
);
// permissions, 이건 주석되어잇었음

// context 에 대한 interface
export interface Context {
  req: Request;
  res: Response;
  connection: DataSource; //타입orm에서 가져오기
  user: any;
  admin: any;
}

// connectDatabase로 디비와 연결하고
// parseAuthHeader로 인증권한 확인
// 인증 정보를 context.user 에 저장.
const context = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<Partial<Context>> => {
  const connection = await ConnectionService.getConnection();

  // const user = await parseAuthHeader(
  //   req.headers["authorization"] as string,
  //   LoginType.APP_USER,
  // );
  // const admin = await parseAuthHeader(
  //   req.headers["authorization"] as string,
  //   LoginType.ADMIN_USER,
  // );

  const user = {};
  const admin = {};

  return { req, res, connection, user, admin };
};

// graphql 서버 실행
const glserver = new ApolloServer({
  schema,
  // graphql 테스팅용 샌드박스 딮하게할땐 빌드후엔 이게 없어야한다
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  //
});

// express 서버 실행!!

const createExpressApp = async () => {
  const expressApp = express();
  expressApp.use(cors());

  // parse application/json
  expressApp.use(express.json());

  expressApp.use(cookieParser());

  await glserver.start();

  expressApp.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(glserver, {
      context,
    }),
  );

  return expressApp;
};

export default createExpressApp;
