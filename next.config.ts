import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'picsum.photos',
      port: '',
      pathname: '/**',
    },
    // Opsi A: Jika cuma butuh 1 level subdomain (contoh: cdn.asuma.my.id)
    {
      protocol: 'https',
      hostname: '*.asuma.my.id', 
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'asuma.my.id', 
      port: '',
      pathname: '/**',
    },
  ],
},
  output: 'standalone',
  transpilePackages: ['motiaon'],
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
