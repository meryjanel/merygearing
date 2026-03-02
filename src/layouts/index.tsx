// components

import AtsLayoutProvider from "client/components/common/views/atsLayoutProvider";
import { AtsDexieContextProvider } from "client/contexts/atsDexieContext";
import { ReactNode } from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, GetStaticProps } from "next";
import AtsHeader from "./headers/atsHeader";
import { Box } from "@mui/material";
import { WikiCardStackContextProvider } from "client/components/wiki/contexts/wikiCardStackContext";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  variant?: "main" | "wiki" | "ats";
};

export default function Layout({ variant = "main", children }: Props) {
  if (variant === "main") {
    return (
      <>
        <AtsDexieContextProvider>{children}</AtsDexieContextProvider>
      </>
    );
  }

  if (variant === "ats") {
    return (
      <>
        <AtsDexieContextProvider>
          <WikiCardStackContextProvider>
            <AtsLayoutProvider>
              <AtsHeader />
              {/* ats헤더 높이 xs : 52 sm : 60  */}
              <Box pt={{ xs: "72px", sm: "80px" }} pb={"72px"}>
                {children}
              </Box>
            </AtsLayoutProvider>
          </WikiCardStackContextProvider>
        </AtsDexieContextProvider>
      </>
    );
  }

  return <>뭐시여{children}</>;
}

// export const withI18nProps = (
//   namespaces: string[] = ["common"],
//   secondCallback?: GetStaticProps,
// ): GetStaticProps => {
//   return async (context) => {
//     const { locale } = context;

//     // 1. i18n 번역 데이터 가져오기 (서버 사이드 실행)
//     const i18nProps = await serverSideTranslations(locale ?? "ko", namespaces);

//     // 2. 만약 추가적인 getStaticProps 로직이 있다면 실행
//     if (secondCallback) {
//       const result = await secondCallback(context);
//       if ("props" in result) {
//         return {
//           ...result,
//           props: {
//             ...i18nProps,
//             ...(await result.props),
//           },
//         };
//       }
//       return result;
//     }

//     // 3. 기본 번역 데이터만 반환
//     return {
//       props: {
//         ...i18nProps,
//       },
//     };
//   };
// };
