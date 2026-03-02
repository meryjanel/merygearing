import { DEFAULT_MAIN_COLOR } from "client/themes/muiTheme";
import Cookies from "js-cookie"; //csr
import { useMediaQuery, useTheme } from "@mui/material";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext<IThemeContextProviderValue | null>(null);

type ThemeContextProviderProps = {
  children: ReactNode;
  cookies: NextApiRequestCookies;
};

interface IThemeContextProviderValue {
  isXs: boolean;
  isThemeLoading: boolean;
  // mainColor: string;
  // setMainColor: (mainColor: string) => void;
  // saveMainColor: (mainColor: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  resetTheme: () => void;
}

const ThemeContextProvider = ({
  children,
  cookies,
}: ThemeContextProviderProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [isThemeLoading, setIsThemeLoading] = useState(true);
  // const [mainColor, setMainColor] = useState(
  //   cookies["main_color"] || DEFAULT_MAIN_COLOR,
  // );
  const [isDarkMode, setIsDarkMode] = useState(
    cookies["is_dark_mode"] === "true",
  );

  useEffect(() => {
    // if (!cookies["main_color"]) Cookies.set("main_color", DEFAULT_MAIN_COLOR);
    if (!cookies["is_dark_mode"]) Cookies.set("is_dark_mode", "false");
  }, []);

  // const saveMainColor = (mainColor: string) => {
  //   setMainColor(mainColor);
  //   Cookies.set("main_color", mainColor);
  //   // window.localStorage.setItem("main_color", mainColor);
  // };

  const resetTheme = () => {
    //   saveMainColor(DEFAULT_MAIN_COLOR);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      Cookies.set("is_dark_mode", "" + !prev);
      return !prev;
    });
  };

  const value: IThemeContextProviderValue = {
    isXs,
    isThemeLoading,
    // mainColor,
    // setMainColor,
    // saveMainColor,
    isDarkMode,
    toggleDarkMode,
    resetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext is undefined");
  }

  return context;
};

export { useThemeContext, ThemeContextProvider };
