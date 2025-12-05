import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'your-laravel-domain.test',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'your-laravel-domain.test',
        pathname: '/page-images/**',   
      },
    ],
        dangerouslyAllowLocalIP: true,
  },

   allowedDevOrigins: [
    'http://your-laravel-domain.test',
    'http://localhost:8000',
  ],
};

export default nextConfig;
