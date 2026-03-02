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

export type dlcType = "Keepers of the Stone" | "Nightwatchers" | null;
export type fertileSoilType = "small" | "average" | "none";
@Entity()
export class BiomeEntity extends BaseEntity {
  @Index()
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  dlc: dlcType;

  @Column({ nullable: true })
  fertileSoil: fertileSoilType;

  @Column("text", { array: true, default: [] })
  trees: string[];

  @Column("text", { array: true, default: [] })
  nodes: string[];

  @Column("text", { array: true, default: [] })
  effects: string[];

  @Column({ type: "jsonb", nullable: true })
  special: Object;
}
