import { ImapKey } from "client/components/common/types/map.type";
import { Iinput, Irecipe } from "./recipe.type";

// 야영지, 음식, 생산,

export type buildingType = "camp" | "food" | "craft";

export interface Ibuilding extends ImapKey {
  buildingType: buildingType;
  buildingMaterial: Iinput[]; //짓는 재료
  recipes: Irecipe[] | null;
}

export interface IbuildingIndex extends ImapKey {
  buildingType: buildingType;
  allInputs: string[]; //소모되는 물품, 노드
  allProducts: string[]; // 캠프일때 필요할까?, 없다고 결정, primary 하나만 넣기
}

const buildings: Ibuilding[] = [
  {
    key: "bld_cam_woodcutter",
    name: "나무꾼 야영지",
    thumbnail: "",
    buildingType: "camp",
    buildingMaterial: [
      {
        inputId: "res_wood",
        inputName: "wood",
        inputThumbnail: "",
        number: 10,
      },
      {
        inputId: "res_parts",
        inputName: "parts",
        inputThumbnail: "",
        number: 3,
      },
    ],
    recipes: [
      {
        productId: "res_wood",
        productThumbnail: "",
        productNumber: 1,
        grade: 0,
        time: 7,
      },
    ],
  },
  {
    key: "bld_fod_ranch",
    name: "목장",
    thumbnail: "",
    buildingType: "food",
    buildingMaterial: [
      {
        inputId: "res_planks",
        inputName: "plank",
        inputThumbnail: "",
        number: 5,
      },
    ],
    recipes: [
      {
        productId: "res_eggs",
        productThumbnail: "",
        productNumber: 5,
        grade: 1,
        time: 84,
        inputs: [
          {
            inputId: "res_grain",
            inputName: "곡물",
            inputThumbnail: "",
            number: 3,
          },
          {
            inputId: "res_insects",
            inputName: "벌레",
            inputThumbnail: "",
            number: 2,
          },
          {
            inputId: "res_reed",
            inputName: "갈대",
            inputThumbnail: "",
            number: 2,
          },
          {
            inputId: "res_berries",
            inputName: "나무딸기",
            inputThumbnail: "",
            number: 2,
          },
        ],
      },
      {
        productId: "res_leather",
        productThumbnail: "",
        productNumber: 4,
        grade: 1,
        time: 42,
        inputs: [
          {
            inputId: "res_algae",
            inputName: "조류",
            inputThumbnail: "",
            number: 2,
          },
          {
            inputId: "res_reed",
            inputName: "갈대",
            inputThumbnail: "",
            number: 2,
          },
          {
            inputId: "res_grain",
            inputName: "곡물",
            inputThumbnail: "",
            number: 2,
          },
          {
            inputId: "res_vegetables",
            inputName: "채소",
            inputThumbnail: "",
            number: 1,
          },
        ],
      },
      {
        productId: "res_meat",
        productThumbnail: "",
        productNumber: 10,
        grade: 1,
        time: 84,
        inputs: [
          {
            inputId: "res_plant_fiber",
            inputName: "식물 섬유",
            inputThumbnail: "",
            number: 8,
          },
          {
            inputId: "res_reed",
            inputName: "갈대",
            inputThumbnail: "",
            number: 8,
          },
          {
            inputId: "res_algae",
            inputName: "조류",
            inputThumbnail: "",
            number: 8,
          },
          {
            inputId: "res_grain",
            inputName: "곡물",
            inputThumbnail: "",
            number: 8,
          },
          {
            inputId: "res_vegetables",
            inputName: "채소",
            inputThumbnail: "",
            number: 5,
          },
        ],
      },
    ],
  },
];
