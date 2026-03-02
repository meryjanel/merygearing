export interface Iinput {
  //물품
  inputId: string;
  inputName: string;
  inputThumbnail: string;
  number: number;
}

export interface Irecipe {
  productId: string; //결과물의key
  productThumbnail: string; //
  productNumber: number;
  grade: number; //효율 0,1,2,3별
  time: number; //만드는데 걸리는 시간(초)
  inputs?: Iinput[]; //투입 농사 채집이면 null
}
