/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "http",
            hostname: "104.250.180.67",
         },
      ],
   },
};

module.exports = nextConfig;
