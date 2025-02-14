/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bfcvoikogyjfeqxzuaob.supabase.co', // Your Supabase storage domain
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // For GitHub avatars
        pathname: '/**',
      },
    ],
  },
    reactStrictMode: false,
};

export default nextConfig;
