// next.config.js ou next.config.ts (se estiver usando TypeScript)
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
      'profilerr.net',
      // adicione outros domínios aqui conforme necessário
    ],
  },
};

export default nextConfig;

