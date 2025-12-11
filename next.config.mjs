/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Leave experimental settings empty for now to avoid Turbopack conflicts
  // If you need to add server-only externals, ensure they don't overlap
  // with packages listed in `transpilePackages`.
  experimental: {},
}

export default nextConfig
