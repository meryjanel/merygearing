import { Field, ObjectType } from "type-graphql";
import * as biomeEntity from "../entities/biome.entity";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class BiomeObject {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  dlc: biomeEntity.dlcType;

  @Field({ nullable: true })
  fertileSoil: biomeEntity.fertileSoilType;

  @Field(() => [String], { nullable: true })
  trees: string[];

  @Field(() => [String], { nullable: true })
  nodes: string[];

  @Field(() => [String], { nullable: true })
  effects: string[];

  @Field(() => GraphQLJSON, { nullable: true })
  special: Object;
}
