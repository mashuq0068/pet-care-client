/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
        },
        {
          protocol: 'https',
          hostname: 'i.ibb.co.com',
        },
        {
          protocol: 'https',
          hostname: 'i.postimg.cc',
        },
      ],
    },
  };
  
  export default nextConfig;
  