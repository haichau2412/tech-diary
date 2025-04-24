import { MDXEntry } from "@/types";
import { getEntries } from "@/utils/readMdx";
import { notFound } from "next/navigation";
import { stripDescription } from "@/utils/mdx";
import MDXComponents from "../ui/mdx-component.tsx";
import TOCSection from "../ui/Toc.tsx";

interface Props {
  params: Promise<{ slug: string }>;
}

const BlogPage = async ({ params }: Props) => {
  const entries = await getEntries("all");

  const { slug } = await params;
  const entry = entries.find((entry) => entry.frontmatter.slug === slug);

  if (!entry) {
    notFound();
  }

  const { default: MDXContent } = entry;

  return (
    <div>
      {" "}
      <TOCSection entry={entry} />
      <MDXContent components={MDXComponents} />
    </div>
  );
};

const generateStaticParams = async () => {
  return (await getEntries("all")).map((entry) => ({
    slug: entry.frontmatter.slug,
  }));
};

const generateMetadata = async ({ params }: Props) => {
  const entries: MDXEntry[] = await getEntries("all");
  const { slug } = await params;
  const entry = entries.find((entry) => entry.frontmatter.slug === slug);
  if (!entry) notFound();
  const title = entry.frontmatter.title;
  const description = await stripDescription(entry.frontmatter.description);
  return {
    title,
    description,
  };
};

export { generateMetadata, generateStaticParams };

export default BlogPage;
