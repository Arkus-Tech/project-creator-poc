/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pocketcreator.jimmymcbride.dev",
        port: "",
        pathname: "/api/files/_pb_users_auth_/ooelbyidysr4c9n/**",
      },
    ],
  },
}

module.exports = nextConfig
