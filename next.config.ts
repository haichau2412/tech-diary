import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns:
      [
        {
          protocol: 'https',
          hostname: "img.youtube.com",
          port: "",
          pathname: "**"
        }
      ]
  },
  async redirects() {
    return [
      {
        source: '/playground/foodvendor',
        destination: '/playground/foodvendor/dashboard',
        permanent: true,
      },
    ]
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
