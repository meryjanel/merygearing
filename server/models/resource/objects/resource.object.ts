import { Field, ObjectType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import * as resourceEntity from "../entities/resource.entity";
import { BuildingsProductionObject } from "server/models/building/objects/buildingProduction.object";

@ObjectType()
export class ResourceObject {
  @Field()
  id: string;

  @Field({ nullable: true })
  type: resourceEntity.resourceType;

  @Field(() => GraphQLJSON, { nullable: true })
  price: Object;

  @Field(() => [String], { nullable: true })
  speciesPreference: string[];

  @Field(() => [BuildingsProductionObject], { nullable: true })
  productionBuildings: BuildingsProductionObject[];

  @Field(() => GraphQLJSON, { nullable: true })
  special: Object;
}
