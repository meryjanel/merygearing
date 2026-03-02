import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
// emotion

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <title>{"Gaming Gearing"}</title>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
          {/* 프리텐다드 폰트 */}
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          />

          <meta name="description" content="MGG Project" />
          <meta name="keywords" content="MGG" />
          <meta name="author" content="LMJ" />

          {/* 카카오 미리보기 설명 */}
          <meta property="og:title" content="MGG Project" />
          <meta property="og:description" content="MGG" />
        </Head>
        <body
          style={
            {
              // backgroundColor: "yellow",
            }
          }
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
// -----------------------------------

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  // const ctxcookie = ctx?.req?.headers?.cookie || "";

  // const cookies = qs.decode(ctxcookie, "; ");

  // console.log(cookies, "쿠키스다요");

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles)],
  };
};
