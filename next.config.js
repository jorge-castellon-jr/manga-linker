/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avt.mkklcdnv6temp.com",
      },
      {
        protocol: "https",
        hostname: "bumn2.mkklcdnv6temp.com",
      },
      {
        protocol: "https",
        hostname: "images.castellon.dev",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
