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
import { BonusObject } from "../objects/bonus.object";

export type nodeSizeType =
  | "tree"
  | "vein"
  | "small"
  | "large"
  | "xlarge"
  | null;

@Entity()
export class NodeEntity extends BaseEntity {
  @Index()
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  size: nodeSizeType;

  @Column()
  charges: number;

  @Column()
  primary: string;

  @Column("text", { array: true, default: [] })
  camp: string[];

  @Column("text", { array: true })
  biome: string[];

  @Column({ type: "jsonb", nullable: true })
  bonus: BonusObject[];

  @Column("text", { array: true, default: [] })
  allResources: string[];

  @Column({ type: "jsonb", nullable: true })
  special: Object;
}
