import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkReadingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx.js";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
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
  options: {
    remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'meta' }]],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          keepBackground: false,
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            if (node.children.length === 0) {
              node.properties.className.push("highlighted");
            }
          },
          onVisitHighlightedWord(node) {
            if (node.children.length === 0) {
              node.properties.className = ["word"];
            }
          },
        },
      ],
      withToc,
      withTocExport,
      remarkReadingTime,
      readingMdxTime,
    ],
  },
});


export default withMDX(nextConfig);
