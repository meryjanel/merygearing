import { Field, ObjectType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import * as buildingEntity from "../entities/building.entity";
import { BuildingConstructionObject } from "./buildingContstruction.object";

@ObjectType()
export class BuildingObject {
  @Field()
  id: string;

  @Field({ nullable: true })
  buildingType: buildingEntity.buildingType;

  @Field({ nullable: true })
  workers: number;

  @Field({ nullable: true })
  storage: number;

  @Field(() => [BuildingConstructionObject], { nullable: true })
  buildingIngredients: BuildingConstructionObject[];

  @Field({ nullable: true })
  cityScore: number;

  @Field({ nullable: true })
  buildTime: number;

  @Field({ nullable: true })
  buildingSize: string;

  @Field(() => [String], { nullable: true })
  proficiency: string[];

  @Field(() => [String], { nullable: true })
  comfort: string[];

  @Field(() => GraphQLJSON, { nullable: true })
  logic: Object;

  @Field()
  moveable: Boolean;

  @Field({ nullable: true })
  rainpunk: string;

  @Field(() => [String], { nullable: true })
  allIngredients: string[];

  @Field(() => [String], { nullable: true })
  allProducts: string[];

  @Field(() => GraphQLJSON, { nullable: true })
  special: Object;
}
