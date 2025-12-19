import type { NextConfig } from 'next';
import { URL } from 'url';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost';

let BACKEND_HOST: string;
let BACKEND_PROTOCOL: 'http' | 'https';

try {
  const urlParsed = new URL(BASE_URL);
  BACKEND_HOST = urlParsed.hostname;
  
  if (urlParsed.protocol === 'https:') {
    BACKEND_PROTOCOL = 'https';
  } else {
    BACKEND_PROTOCOL = 'http';
  }

} catch (e) {
  console.error("Invalid NEXT_PUBLIC_API_BASE_URL format. Using default host: localhost");
  BACKEND_HOST = 'localhost';
  BACKEND_PROTOCOL = 'http';
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: BACKEND_PROTOCOL,
        hostname: BACKEND_HOST,
        pathname: '/storage/**',
      },
      {
        protocol: BACKEND_PROTOCOL,
        hostname: BACKEND_HOST,
        pathname: '/page-images/**', 
      },
      {
        protocol: 'http',
        hostname: 'localhost', 
      },
    ],
    dangerouslyAllowLocalIP: true,
  },

  allowedDevOrigins: [
    BASE_URL,
    'http://localhost:3000',
    'http://localhost:8000', // Lasciato per il server Laravel
  ],
};

export default nextConfig;