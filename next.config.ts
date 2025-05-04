// next.config.js ou next.config.ts (se estiver usando TypeScript)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
      'profilerr.net',
      'scontent-for2-1.xx.fbcdn.net'
    ],
  },
};

export default nextConfig;

