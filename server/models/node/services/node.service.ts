import { entityUpdateData } from "server/lib/commontype";
import { NodeEntity, nodeSizeType } from "../entities/node.entity";
import { BonusObject } from "../objects/bonus.object";
import { BuildingsProductionObject } from "server/models/building/objects/buildingProduction.object";

export interface InodeInput {
  id: string;
  primary: string;
  biome: string[];
  charges: number;
  // camp: string[];
  size?: nodeSizeType;
  bonus?: BonusObject[];
  special?: Object;
}

export default class nodeService {
  private static instance: nodeService;

  private constructor() {}

  public static getInstance() {
    if (!nodeService.instance) {
      nodeService.instance = new nodeService();
    }

    return nodeService.instance;
  }

  public static createNode = async (
    id: string,
    primary: string,
    bonus?: BonusObject[],
  ) => {
    try {
      const node = new NodeEntity();
      node.id = id;
      node.primary = primary;
      node.bonus = bonus;
      const result = await node.save();
      return result;
    } catch (e) {
      console.log("createNode error", e);
    }
  };

  public static saveNodes = async (nodeInputs: InodeInput[]) => {
    try {
      const saveNodesPromises = nodeInputs.map(async (nodeInput) => {
        const node = new NodeEntity();
        node.id = nodeInput.id;
        node.primary = nodeInput.primary;
        node.biome = nodeInput.biome;
        node.charges = nodeInput.charges;
        // node.camp = nodeInput.camp;
        node.size = nodeInput?.size;
        node.bonus = nodeInput?.bonus;
        node.special = nodeInput?.special || null;
        return await node.save();
      });
      return Promise.all(saveNodesPromises);
    } catch (e) {
      console.log("saveNodes error", e);
    }
  };

  public static updateNode = async (id: string, datas: entityUpdateData[]) => {
    try {
      const node = await NodeEntity.createQueryBuilder("node")
        .andWhere("node.id = :id", { id })
        .getOne();

      if (!node) {
        console.log("해당 노드 없음 : ", id);
        return null;
      }

      datas?.forEach((data) => {
        node[data?.key] = data?.data;
      });

      return await node.save();
    } catch (e) {
      console.log("updateNode error", e);
    }
  };

  public static updateNodeArrayPush = async (
    id: string,
    data: entityUpdateData,
  ) => {
    try {
      const node = await NodeEntity.createQueryBuilder("node")
        .andWhere("node.id = :id", { id })
        .getOne();

      if (!node) {
        console.log("해당 노드 없음 : ", id);
        return null;
      }

      if (!node[data?.key].includes(data?.data)) {
        node[data?.key].push(data?.data);
      }

      return await node.save();
    } catch (e) {
      console.log("updateNodeArrayPush error", e);
    }
  };

  public static getNode = async (id: string): Promise<NodeEntity> => {
    const node = await NodeEntity.createQueryBuilder("node")
      .andWhere("node.id = :id", { id })
      .getOne();

    if (!node) {
      console.log("해당 노드 없음 : ", id);
      return null;
    }

    return node;
  };

  public static updateNodeCamp = async (id: string, camp: string) => {
    const node = await this.getNode(id);

    if (!node) return null;

    if (!node.camp.includes(camp)) {
      node.camp.push(camp);
      await node.save();
    }
  };

  public static nodeLists = async () => {
    try {
      const nodes = await NodeEntity.createQueryBuilder("node").getMany();

      return nodes;
    } catch (e) {
      console.log("nodeLists error", e);
    }
  };

  public static nodeAllResourceSet = async () => {
    try {
      const nodes = await NodeEntity.createQueryBuilder("node").getMany();

      await Promise.all(
        await nodes.map(async (node) => {
          const allResources = [];
          allResources.push(node.primary);

          for (const bonusD of node.bonus) {
            if (!allResources.includes(bonusD.id)) {
              allResources.push(bonusD.id);
            }
          }

          node.allResources = allResources;

          console.log(node, "올");

          await node.save();
        }),
      );
    } catch (e) {
      console.log("nodeAllResourceSet error", e);
    }
  };

  // size여부를 우선하여, id로 정렬
  public static allNodeList = async () => {
    try {
      const nodeList = await NodeEntity.createQueryBuilder("node")
        .orderBy("node.size", "ASC")
        .addOrderBy("node.id", "ASC")
        .getMany();

      return nodeList;
    } catch (e) {
      console.log("allNodeList error", e);
    }
  };
}
