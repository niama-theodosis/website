/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

import withBundleAnalyzer from "@next/bundle-analyzer"

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    ppr: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
        port: "",
        pathname: "/**/**",
      },
    ],
  },
}

export default process.env.ANALYZE === "true" ? withBundleAnalyzer()(config) : config
