import { evaluate } from "@mdx-js/mdx";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import html from "remark-html";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkReadingTime from "remark-reading-time";
import readingMdxTime from "remark-reading-time/mdx";
import strip from "strip-markdown"; // remove formatting
import type { MDXEntry } from "@/types";
import remarkGfm from "remark-gfm";
// process : remark -> rehype -> html
// toc: table of contents
// remark: markdown -> html
// rehype: html -> html (with plugins)

const renderDescription = async (markdown: string): Promise<string> => {
  return (await remark().use(html).process(markdown)).toString();
};

const stripDescription = async (markdown: string): Promise<string> => {
  return (await remark().use(strip).process(markdown)).toString();
};

const serverSideEvaluateMdx = async (mdxContent: string): Promise<MDXEntry> => {
  const result = await evaluate(mdxContent, {
    ...runtime,
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    rehypePlugins: [
      rehypePrettyCode,
      withToc,
      withTocExport,
      remarkReadingTime,
      readingMdxTime,
    ],
  });

  return result as MDXEntry;
};

export { renderDescription, serverSideEvaluateMdx, stripDescription };
