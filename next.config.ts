import type { NextConfig } from "next";
import path from "path";
import i18nConfig from "next-i18next.config";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname),
  },

  webpack: (config, options) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },

  i18n: i18nConfig.i18n as any,
};

export default nextConfig;
