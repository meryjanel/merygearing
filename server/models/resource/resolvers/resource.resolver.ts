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
import { ResourceObject } from "../objects/resource.object";
import resourceService from "../services/resource.service";

@Resolver()
export class resourceResolver {
  @Mutation(() => [ResourceObject], { nullable: true })
  async allResourceList() {
    try {
      const resourceList = await resourceService.allResourceList();

      return resourceList;
    } catch (e) {
      console.log("allResourceList 에러", e);
    }
  }
}
