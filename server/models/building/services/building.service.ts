import { entityUpdateData } from "server/lib/commontype";
import { BuildingEntity, buildingType } from "../entities/building.entity";
import { BuildingConstructionObject } from "../objects/buildingContstruction.object";

export interface IbuildingInput {
  id: string;
  buildingType: buildingType;
  workers: number;
  storage: number;
  buildingIngredients: BuildingConstructionObject[];
  cityScore: number;
  buildTime: number;
  buildingSize: string;
  proficiency: string[];
  comfort: string[];
  logic: Object;
  moveable: boolean;
  rainpunk?: string | null;
  allIngredients: string[];
  allProducts: string[];
  special?: Object | null;
}

export default class buildingService {
  private static instance: buildingService;

  private constructor() {}

  public static getInstance() {
    if (!buildingService.instance) {
      buildingService.instance = new buildingService();
    }

    return buildingService.instance;
  }

  public static createBuilding = async (buildingInput: IbuildingInput) => {
    try {
      const building = new BuildingEntity();

      building.id = buildingInput.id;
      building.buildingType = buildingInput.buildingType;
      building.workers = buildingInput.workers;
      building.storage = buildingInput.storage;
      building.buildingIngredients = buildingInput.buildingIngredients;
      building.cityScore = buildingInput.cityScore;
      building.buildTime = buildingInput.buildTime;
      building.buildingSize = buildingInput.buildingSize;
      building.proficiency = buildingInput.proficiency;
      building.comfort = buildingInput.comfort;
      building.logic = buildingInput.logic;
      building.moveable = buildingInput.moveable;
      building.rainpunk = buildingInput.rainpunk || null;
      building.allIngredients = buildingInput.allIngredients;
      building.allProducts = buildingInput.allProducts;
      building.special = buildingInput.special;

      const result = await building.save();
      return result;
    } catch (e) {
      console.log("createBuilding error", e);
    }
  };

  // type여부를 우선하여, id로 정렬
  public static allBuildingList = async () => {
    try {
      const buildingList = await BuildingEntity.createQueryBuilder("building")
        .orderBy("building.buildingType", "ASC")
        .addOrderBy("building.id", "ASC")
        .getMany();

      return buildingList;
    } catch (e) {
      console.log("allBuildingList error", e);
    }
  };
}
