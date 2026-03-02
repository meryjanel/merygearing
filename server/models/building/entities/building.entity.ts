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
import { BuildingConstructionObject } from "../objects/buildingContstruction.object";

export type buildingType =
  | "camp"
  | "farming"
  | "food"
  | "industry"
  | "city"
  | "service";

@Entity()
export class BuildingEntity extends BaseEntity {
  @Index()
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  buildingType: buildingType;

  @Column({ nullable: true })
  workers: number;

  @Column({ nullable: true })
  storage: number;

  @Column({ type: "jsonb", nullable: true })
  buildingIngredients: BuildingConstructionObject[];

  @Column({ nullable: true })
  cityScore: number;

  @Column({ nullable: true })
  buildTime: number;

  @Column({ nullable: true })
  buildingSize: string;

  @Column("text", { array: true })
  proficiency: string[];

  @Column("text", { array: true })
  comfort: string[];

  @Column({ type: "jsonb", nullable: true })
  logic: Object;

  @Column()
  moveable: Boolean;

  @Column({ nullable: true, default: null })
  rainpunk: string;

  @Column("text", { array: true })
  allIngredients: string[];

  @Column("text", { array: true })
  allProducts: string[];

  @Column({ type: "jsonb", nullable: true })
  special: Object;
}
