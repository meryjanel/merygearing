import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BuildingConstructionObject {
  @Field({ nullable: true })
  material: string;

  @Field({ nullable: true })
  num: number;
}
