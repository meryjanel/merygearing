import { useAtsDataSync } from "client/hooks/useAtsDataSync.hook";
import { ReactNode } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import ButtonToggleDarkMode from "./buttonToggleDarkMode";
import LoadingScreen from "./loadingScreen";

type AtsLayoutProviderProps = {
  children: ReactNode;
};

const AtsLayoutProvider = ({ children }: AtsLayoutProviderProps) => {
  const { isSyncLoading } = useAtsDataSync();

  const { t } = useTranslation("common");

  const router = useRouter();
  const { pathname, asPath, query } = router;

  // const changeLanguage = (newLocale: string) => {
  //   Cookies.set("NEXT_LOCALE", newLocale, { expires: 365, path: "/" });
  //   router.push({ pathname, query }, asPath, { locale: newLocale });
  // };

  // db정리중이면 전체로딩스크린
  if (isSyncLoading) return <LoadingScreen />;

  return (
    <>
      {/* <p>{t("save")}</p>
      <ButtonToggleDarkMode />
      <button onClick={() => changeLanguage("ko")}>KO</button>
      <button onClick={() => changeLanguage("en")}>EN</button> */}
      {children}
    </>
  );
};

export default AtsLayoutProvider;
