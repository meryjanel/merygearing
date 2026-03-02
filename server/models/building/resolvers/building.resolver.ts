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
import { BuildingObject } from "../objects/building.object";
import buildingService from "../services/building.service";

@Resolver()
export class buildingResolver {
  @Mutation(() => [BuildingObject], { nullable: true })
  async allBuildingList() {
    try {
      const bulidingList = await buildingService.allBuildingList();

      return bulidingList;
    } catch (e) {
      console.log("allBuildingList 에러", e);
    }
  }
}
