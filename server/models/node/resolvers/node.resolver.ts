import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  Arg,
  Int,
  Authorized,
} from "type-graphql";
import { GraphQLError } from "graphql";
import type { Context } from "server/express";
import nodeService from "../services/node.service";
import { NodeObject } from "../objects/node.object";

@Resolver()
export class PointResolver {
  @Mutation(() => [NodeObject], { nullable: true })
  async nodeList() {
    try {
      const nodeList = await nodeService.nodeLists();

      return nodeList;
    } catch (e) {
      console.log("nodeList 에러", e);
    }
  }
  @Query(() => [NodeObject], { nullable: true })
  async nodeListQuery() {
    try {
      const nodeList = await nodeService.nodeLists();

      return nodeList;
    } catch (e) {
      console.log("nodeList 에러", e);
    }
  }

  @Mutation(() => [NodeObject], { nullable: true })
  async allNodeList() {
    try {
      const nodelist = await nodeService.allNodeList();

      return nodelist;
    } catch (e) {
      console.log("nodelist 에러", e);
    }
  }
}
