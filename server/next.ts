import next from "next";
import createExpressApp from "./express";
import * as url from "url";

// next.js ssr서버 설정
// 데브는 추후에 env추가해서 설정
const app = next({ dev: true });
const handle = app.getRequestHandler();

// nextjs를 expressApp으로 실행
const nextApp = async () => {
  await app.prepare();

  const expressApp = await createExpressApp();

  expressApp.all("/{*splat}", async (req: any, res: any) => {
    const parsedUrl = url.parse(req.url, true);
    const { url: pathname, cookies } = req;

    const passLocalePre = ["/_next", "/__next", "/api", "/graphql", "/public"];
    let passLocale =
      passLocalePre.reduce((prefix) => {
        return pathname.startsWith(prefix);
      }, false) || pathname.includes(".");

    // const passLocale = pathname.startsWith("/_next") || pathname.includes(".");
    const cookieLocale = cookies["NEXT_LOCALE"];
    const hasLocale =
      pathname.startsWith("/ko") ||
      pathname.startsWith("/koa") ||
      pathname.startsWith("/en");

    if (!passLocale && !hasLocale && !!cookieLocale)
      parsedUrl.pathname = `/${cookieLocale}${pathname}`;

    return handle(req, res, parsedUrl);
  });

  return expressApp;
};

export default nextApp;
