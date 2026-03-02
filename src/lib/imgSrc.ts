// 키값으로 이미지 찾아오기

import { atsPrifix } from "client/type/ats.type";

// 아이콘
export const iconSrc = (id: string) => {
  const prefix = id.split("_")[0];
  const decode = atsPrifix[prefix];
  return `/img/icon/${decode}/${id}.webp`;
};

export const sourceSrc = (id: string) => {
  const prefix = id.split("_")[0];
  const decode = atsPrifix[prefix];
  return `/img/source/${decode}/${id}.webp`;
};
