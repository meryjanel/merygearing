import { speciesInterface } from "./species.type";

export const humanSpecies: speciesInterface = {
  species: "",
  baseResolve: 0,
  resilience: "low",
  decadence: 0,
  hungerThreshold: 0,
  breakInterval: 0,
  specialization: {
    comfort: "brewing",
    proficiency: "farming",
  },
  housingNeeds: {
    house: false,
  },
  conplexFoodNeeds: [],
  clothingNeeds: [],
  serviceNeeds: [],
};
