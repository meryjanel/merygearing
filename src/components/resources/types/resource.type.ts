import { ImapKey } from "client/components/common/types/map.type";

export type resourceType =
  | "wood"
  | "fuel"
  | "rawFood"
  | "complexFood"
  | "buildingMaterial"
  | "clothing"
  | "service"
  | "rawCrafting"
  | "crafting"
  | "trade"
  | "fuel"
  | "etc";

export interface Iprice {
  sell: number;
  sellP10: number;
  buy?: number;
}

export interface Iresource extends ImapKey {
  price: Iprice;
  resorceType: resourceType;
  // 키값
  needSpecies: string[];
  // recipes: string[];
  // asIngredientRecipes: string[];
  // allIngredients: string[]; // 인덱스
  // allAsIngredients: string[]; // 인덱스
}

export interface IresourceIndex extends ImapKey {
  needSpecies: string[];
}

const resources: Iresource[] = [
  {
    price: {
      sell: 0.19,
      sellP10: 0.09,
      buy: 0.38,
    },
    resorceType: "rawFood",
    needSpecies: [],
    key: "res_eggs",
    name: "eggs",
    thumbnail: "",
  },
];
