// import "src/styles/globals.css";
// import "client/lib/i18n";
import { appWithTranslation } from "next-i18next";
import type { AppContext, AppProps } from "next/app";

import { NextPage } from "next";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { ApolloProvider } from "@apollo/client";

import App from "next/app";

import qs from "querystring";
import { useApollo } from "client/lib/apolloClient";
import { ThemeContextProvider } from "client/contexts/themeContext";
import MainThemeProvider from "client/themes/muiTheme";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
interface IAppProps extends AppProps {
  // settings: SettingsValueProps;
  Component: NextPageWithLayout;
  cookies: NextApiRequestCookies;
}

function MyApp({ Component, cookies, pageProps }: IAppProps) {
  const apolloClient = useApollo();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeContextProvider cookies={cookies}>
        <MainThemeProvider>
          {/* <Component {...pageProps} /> */}
          {getLayout(<Component {...pageProps} />)}
        </MainThemeProvider>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  //  const cookies = cookie.parse(
  //   context.ctx.req ? context.ctx.req.headers.cookie || "" : document.cookie
  // );

  const ctxcookie = context?.ctx?.req?.headers?.cookie || "";

  const cookies = qs.decode(ctxcookie, "; ");

  return {
    ...appProps,
    // settings,
    cookies,
  };
};

export default appWithTranslation(MyApp);
