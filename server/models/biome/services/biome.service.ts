import { entityUpdateData } from "server/lib/commontype";
import {
  BiomeEntity,
  dlcType,
  fertileSoilType,
} from "../entities/biome.entity";

export interface IbiomeInput {
  id: string;
  dlc: dlcType;
  fertileSoil: fertileSoilType;
  trees: string[];
  nodes: string[];
  effects: string[];
  special?: Object;
}

export default class biomeService {
  private static instance: biomeService;

  private constructor() {}

  public static getInstance() {
    if (!biomeService.instance) {
      biomeService.instance = new biomeService();
    }

    return biomeService.instance;
  }

  public static createBiome = async (biomeInput: IbiomeInput) => {
    try {
      const biome = new BiomeEntity();

      biome.id = biomeInput.id;
      biome.dlc = biomeInput.dlc;
      biome.fertileSoil = biomeInput.fertileSoil;
      biome.trees = biomeInput.trees;
      biome.nodes = biomeInput.nodes;
      biome.effects = biomeInput.effects;
      biome.special = biomeInput?.special || null;

      const result = await biome.save();
      return result;
    } catch (e) {
      console.log("createNode error", e);
    }
  };

  // dlc여부를 우선하여, id로 정렬
  public static allBiomeList = async () => {
    try {
      const biomeList = await BiomeEntity.createQueryBuilder("biome")
        .orderBy("biome.dlc", "ASC", "NULLS FIRST")
        .addOrderBy("biome.id", "ASC")
        .getMany();

      return biomeList;
    } catch (e) {
      console.log("allBiomeList error", e);
    }
  };
}
