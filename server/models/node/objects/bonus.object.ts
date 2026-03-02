import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BonusObject {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  bonusPercent: number;
}
