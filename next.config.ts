import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'threls-full-stack-application.test',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'threls-full-stack-application.test',
        pathname: '/page-images/**',   
      },
    ],
        dangerouslyAllowLocalIP: true,
  },

   allowedDevOrigins: [
    'http://threls-full-stack-application.test',
    'http://localhost:8000',
  ],
};

export default nextConfig;