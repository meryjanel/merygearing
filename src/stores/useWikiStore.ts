import { create } from "zustand";

interface IWikiStoreState {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  cardStackList: IwikiCard[];
  addCard: (id: string) => void;
  resetCards: () => void;
  //   moveCard: (index: number) => void;
  popCard: () => void;
  nowIndex: number;
}

export interface IwikiCard {
  index: number; //1~순서대로
  id: string;
}
const startIndex = 0;

const useWikiStore = create<IWikiStoreState>((set, get) => ({
  isDialogOpen: false,
  setIsDialogOpen: (isDialogOpen: boolean) => {
    set({ isDialogOpen });
  },
  cardStackList: [],
  nowIndex: startIndex,

  addCard: (id: string) => {
    const cardIndex = get().nowIndex + 1;
    set((prev) => ({
      // 비어있을때 열기
      isDialogOpen: true,

      nowIndex: cardIndex,
      cardStackList: prev.cardStackList.concat({ index: cardIndex, id }),
    }));
  },

  resetCards: () => {
    set({
      cardStackList: [],
      nowIndex: startIndex,
    });
  },

  popCard: () => {
    set((prev) => ({
      // 마지막 카드면 닫기
      isDialogOpen: prev.cardStackList.length > 1,

      cardStackList: prev.cardStackList.filter(
        (card) => card.index < prev.nowIndex,
      ),
      nowIndex: prev.nowIndex - 1,
    }));
  },

  //   const moveCard = useCallback(
  //     (index: number) => {
  //       nowIndex.current = index;
  //       // setNowIndex(index + 1);
  //       setCardStackList((prev) => prev.filter((card) => card.index <= index));
  //     },
  //     [cardStackList],
  //   );
}));

export default useWikiStore;
