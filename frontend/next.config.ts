import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost', // Aceita se vier localhost
        port: '1337',
        pathname: '/uploads/**/*'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1', // Aceita se vier 127.0.0.1
        port: '1337',
        pathname: '/uploads/**/*'
      }
    ]
  }
};

export default nextConfig;