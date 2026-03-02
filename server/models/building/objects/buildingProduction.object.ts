import { Field, ObjectType } from "type-graphql";
import * as buildingEntity from "../entities/building.entity";

@ObjectType()
export class BuildingsProductionObject {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  grade: number;

  @Field({ nullable: true })
  buildingType: buildingEntity.buildingType;
}
