export interface needInterface {
  species: string;
  housingNeeds: {
    shelter?: boolean;
    house: boolean;
  };
  conplexFoodNeeds: string[];
  clothingNeeds: string[];
  serviceNeeds: string[];
}
