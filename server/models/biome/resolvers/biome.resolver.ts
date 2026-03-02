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
import { BiomeObject } from "../objects/biome.object";
import biomeService from "../services/biome.service";

@Resolver()
export class biomeResolver {
  @Mutation(() => [BiomeObject], { nullable: true })
  async allBiomeList() {
    try {
      const biomeList = await biomeService.allBiomeList();

      return biomeList;
    } catch (e) {
      console.log("biomeList 에러", e);
    }
  }
}
