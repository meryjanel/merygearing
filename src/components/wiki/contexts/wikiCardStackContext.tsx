import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const WikiCardStackContext =
  createContext<IWikiCardStackContextProviderValue | null>(null);

type WikiCardStackContextProviderProps = {
  children: ReactNode;
};

interface IWikiCardStackContextProviderValue {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  cardStackList: IcardStack[];
  addCard: (searchType: string, key: string) => void;
  resetCards: () => void;
  moveCard: (index: number) => void;
  popCard: () => void;
  nowIndex: number;
}

export interface IcardStack {
  index: number; //1~순서대로
  searchType: string;
  key: string;
}
const startIndex = 0;

const WikiCardStackContextProvider = ({
  children,
}: WikiCardStackContextProviderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cardStackList, setCardStackList] = useState<IcardStack[]>([]);
  const nowIndex = useRef(startIndex);
  // const [nowIndex, setNowIndex] = useState(startIndex);

  const addCard = useCallback(
    (searchType: string, key: string) => {
      setCardStackList((prev) =>
        prev.concat({
          index: nowIndex.current + 1,
          // index: nowIndex,
          searchType,
          key,
        }),
      );
      nowIndex.current += 1;
      // setNowIndex((prev) => prev + 1);
    },
    [cardStackList, nowIndex],
  );

  const resetCards = useCallback(() => {
    setCardStackList([]);
    nowIndex.current = startIndex;
    // setNowIndex(startIndex);
  }, []);

  const moveCard = useCallback(
    (index: number) => {
      nowIndex.current = index;
      // setNowIndex(index + 1);
      setCardStackList((prev) => prev.filter((card) => card.index <= index));
    },
    [cardStackList],
  );

  const popCard = useCallback(() => {
    setCardStackList((prev) =>
      prev.filter((card) => card.index < nowIndex.current),
    );
    nowIndex.current -= 1;
  }, [cardStackList]);

  const value: IWikiCardStackContextProviderValue = {
    isDialogOpen,
    setIsDialogOpen,
    cardStackList,
    addCard,
    resetCards,
    moveCard,
    popCard,
    // nowIndex,
    nowIndex: nowIndex.current,
  };

  return (
    <WikiCardStackContext.Provider value={value}>
      {children}
    </WikiCardStackContext.Provider>
  );
};

const useWikiCardStackContext = () => {
  const context = useContext(WikiCardStackContext);
  if (!context) {
    throw new Error("useDexieContext is undefined");
  }

  return context;
};

export { useWikiCardStackContext, WikiCardStackContextProvider };
