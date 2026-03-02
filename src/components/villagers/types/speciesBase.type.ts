export type comfortType =
  | "brewing"
  | "engineering"
  | "warmth"
  | "tailoring"
  | "cooperation"
  | "rainwater"
  | null;

export type proficiencyType =
  | "farming"
  | "woodworking"
  | "meatProduction"
  | "alchemy"
  | "forest"
  | "masonry"
  | "metallugy";

export interface speciesBaseInterface {
  species: string;
  baseResolve: number;
  resilience: "low" | "medium" | "high";
  decadence: number;
  hungerThreshold: number;
  breakInterval: number;

  specialization: {
    comfort: comfortType;
    proficiency: proficiencyType;
  };
}
