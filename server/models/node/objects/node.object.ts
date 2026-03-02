import { Field, ObjectType } from "type-graphql";
import { BonusObject } from "./bonus.object";
import GraphQLJSON from "graphql-type-json";
import * as nodeEntity from "../entities/node.entity";

@ObjectType()
export class NodeObject {
  @Field()
  id: string;

  @Field({ nullable: true })
  size: nodeEntity.nodeSizeType;

  @Field()
  charges: number;

  @Field()
  primary: string;

  @Field(() => [String], { nullable: true })
  camp: string[];

  @Field(() => [String], { nullable: true })
  biome: string[];

  @Field(() => [BonusObject], { nullable: true })
  bonus: BonusObject[];

  @Field(() => [String], { nullable: true })
  allResources: string[];

  @Field(() => GraphQLJSON, { nullable: true })
  special: Object;
}
