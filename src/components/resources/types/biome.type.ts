import { ImapKey } from "client/components/common/types/map.type";

interface InaturalNode {
  node: string;
  weight: number;
}

export interface Ibiome extends ImapKey {
  // key값
  trees: InaturalNode[];
  nodes: InaturalNode[];
  etcs?: Object[];
}

export interface Ibiome_index extends ImapKey {
  allNodes: string[];
}

const biomes: Ibiome[] = [
  {
    key: "bio_royal_woodlands",
    name: "왕실 삼림지",
    thumbnail: "",
    trees: [
      {
        node: "nod_lush_tree",
        weight: 1,
      },
    ],
    nodes: [
      {
        node: "nod_snake_egg",
        weight: 1,
      },
    ],
  },
];

const biome_index: Ibiome_index = {
  key: "bio_royal_woodlands",
  name: "왕실 삼림지",
  thumbnail: "",
  allNodes: ["nod_lush_tree", "nod_snake_egg"],
};
