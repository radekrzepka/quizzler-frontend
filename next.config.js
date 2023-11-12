/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "api.quizzler.tech",
         },
      ],
   },
};

module.exports = nextConfig;
