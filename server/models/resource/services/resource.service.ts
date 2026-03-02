import { BuildingsProductionObject } from "server/models/building/objects/buildingProduction.object";
import { ResourceEntity, resourceType } from "../entities/resource.entity";
import { BuildingEntity } from "server/models/building/entities/building.entity";

export interface IresourceInput {
  id: string;
  type: resourceType;
  price?: Object | null;
  speciesPreference?: string[];
  productionBuildings?: BuildingsProductionObject[];
  special?: Object | null;
}

export default class resourceService {
  private static instance: resourceService;

  private constructor() {}

  public static getInstance() {
    if (!resourceService.instance) {
      resourceService.instance = new resourceService();
    }

    return resourceService.instance;
  }

  public static createResource = async (resourceInput: IresourceInput) => {
    try {
      const resource = new ResourceEntity();

      resource.id = resourceInput.id;
      resource.type = resourceInput.type;
      resource.price = resourceInput.price || null;
      resource.speciesPreference = resourceInput.speciesPreference || [];
      resource.productionBuildings = resourceInput.productionBuildings || [];
      resource.special = resourceInput.special || null;

      const result = await resource.save();
      return result;
    } catch (e) {
      console.log("createResource error", e);
    }
  };

  public static getResource = async (id: string): Promise<ResourceEntity> => {
    const node = await ResourceEntity.createQueryBuilder("resource")
      .andWhere("resource.id = :id", { id })
      .getOne();

    if (!node) {
      console.log("해당 자원 없음 : ", id);
      return null;
    }

    return node;
  };

  public static updateResourceProuctionBuilding = async (
    id: string,
    building: BuildingsProductionObject,
  ) => {
    const resource = await this.getResource(id);

    if (!resource) return null;

    let isProductionBuilding = false;

    resource.productionBuildings.map((pb) => {
      if (pb.id === building.id) isProductionBuilding = true;
    });

    if (!isProductionBuilding) {
      resource.productionBuildings.push(building);
      await resource.save();
    }
  };

  public static updateResourceProuctionBuildingAddType = async (id: string) => {
    try {
      const resource = await this.getResource(id);

      if (!resource) return null;

      const getTypePromises = await resource.productionBuildings.map(
        async (pb) => {
          const buildingId = pb.id;

          const building = await BuildingEntity.createQueryBuilder("buliding")
            .andWhere("buliding.id = :id", { id: buildingId })
            .getOne();

          pb.buildingType = building.buildingType;

          return pb;
        },
      );

      resource.productionBuildings = await Promise.all(getTypePromises);

      console.log("문제읍나? : ", resource);
      await resource.save();
    } catch (e) {
      console.log(id, "여기 에러발생", e);
    }
  };

  public static resourceProductionBuildingCheck = async (
    id: string,
    building: BuildingsProductionObject,
  ) => {
    const resource = await this.getResource(id);

    if (!resource) {
      console.log("해당 자원 없음 : ", id);
      return null;
    }

    let isRight = false;
    resource.productionBuildings.map((pb) => {
      if (pb.id === building.id && pb.grade === building.grade) isRight = true;
    });

    if (!isRight) {
      console.log("이 자원 문제 발생 : ", id, building);
    }
  };

  // 타입을 우선하여 id로 정렬
  public static allResourceList = async () => {
    try {
      const resourceList = await ResourceEntity.createQueryBuilder("resource")
        .orderBy("resource.type", "ASC")
        .addOrderBy("resource.id", "ASC")
        .getMany();

      return resourceList;
    } catch (e) {
      console.log("allResourceList error", e);
    }
  };
}
