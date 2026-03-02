import { BuildingsProductionObject } from "server/models/building/objects/buildingProduction.object";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export type resourceType =
  | "raw_food"
  | "complex_food"
  | "building_material"
  | "clothing_good"
  | "service_good"
  | "crafting_material"
  | "refined_crafting_material"
  | "trade_good"
  | "fuel"
  | "exploration";

@Entity()
export class ResourceEntity extends BaseEntity {
  @Index()
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  type: resourceType;

  @Column({ type: "jsonb", nullable: true })
  price: Object;

  @Column("text", { array: true, default: [] })
  speciesPreference: string[];

  @Column({ type: "jsonb", nullable: true })
  productionBuildings: BuildingsProductionObject[];

  @Column({ type: "jsonb", nullable: true })
  special: Object;
}
