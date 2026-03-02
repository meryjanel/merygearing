import useDexihook, { IuseDexihook } from "client/hooks/useDexie.hook";
import { getDbInstance, IDexie } from "client/lib/dexie";
import Dexie from "dexie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AtsDexieContext = createContext<IAtsDexieContextProviderValue | null>(
  null,
);

type AtsDexieContextProviderProps = {
  children: ReactNode;
};

interface IAtsDexieContextProviderValue {
  db: Dexie;
  isReady: boolean;
}

export const atsDexieDbSchema: IDexie = {
  dbname: "atsdb",
  stores: [
    { storename: "biome", keyString: "id" },
    { storename: "biome_index", keyString: "id, name, initial" },
    { storename: "building", keyString: "id" },
    {
      storename: "building_index",
      keyString:
        "id, name, initial, buildingType, *allIngredients, allProducts, proficiency, comfort",
    },
    { storename: "node", keyString: "id" },
    {
      storename: "node_index",
      keyString: "id, name, initial, size, *camp, biome, *allResources",
    },
    { storename: "resource", keyString: "id" },
    {
      storename: "resource_index",
      keyString: "id, name, initial, type, speciesPreference",
    },
  ],
};

const AtsDexieContextProvider = ({
  children,
}: AtsDexieContextProviderProps) => {
  // const { db, isReady } = useDexihook(atsDexieDbSchema);

  const db = useMemo(() => getDbInstance(atsDexieDbSchema), [atsDexieDbSchema]);
  const [isReady, setIsReady] = useState(false);

  const init = async () => {
    await db.open();
    setIsReady(true);
  };

  useEffect(() => {
    init();
  }, [db]);

  const value: IAtsDexieContextProviderValue = {
    db,
    isReady,
  };

  return (
    <AtsDexieContext.Provider value={value}>
      {children}
    </AtsDexieContext.Provider>
  );
};

const useAtsDexieContext = () => {
  const context = useContext(AtsDexieContext);
  if (!context) {
    throw new Error("useDexieContext is undefined");
  }

  return context;
};

export { useAtsDexieContext, AtsDexieContextProvider };
