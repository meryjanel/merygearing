import { ImapKey } from "client/components/common/types/map.type";

export type nodeSize = "small" | "large" | "xlarge";

interface Ibonus {
  resource: string;
  percent: number;
}

export interface Inode extends ImapKey {
  camp: string; //키값 인덱스
  size: nodeSize;
  charges: number;
  img: string;
  //키값
  primary: string;
  bonus: Ibonus[];
  biome: string[]; // 인덱스
  allResources: string[]; //인덱스
}

const nodes: Inode[] = [
  {
    key: "nod_lush_tree",
    camp: "bld_cam_woodcutter",
    size: "small",
    charges: 2,
    img: "",
    primary: "res_wood",
    bonus: [
      { resource: "res_wood", percent: 100 },
      { resource: "res_resin", percent: 15 },
      { resource: "res_plant_fiber", percent: 10 },
      { resource: "res_eggs", percent: 5 },
    ],
    biome: ["bio_royal_woodlands"],
    allResources: ["res_wood", "res_resin", "res_plant_fiber", "res_eggs"],
    name: "lush_tree",
    thumbnail: "",
  },
  {
    key: "nod_snake_nest",
    camp: "bld_cam_trapper",
    size: "small",
    charges: 15,
    img: "",
    primary: "res_eggs",
    bonus: [{ resource: "res_leather", percent: 20 }],
    biome: ["bio_ashen_thicket", "bio_royal_woodlands"],
    allResources: ["res_eggs", "res_leather"],
    name: "snake_nest",
    thumbnail: "",
  },
];
