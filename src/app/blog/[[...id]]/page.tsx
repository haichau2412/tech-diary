import { MDXEntry } from "@/types";
import { getEntries } from "@/utils/readMdx";
import { compareDesc } from "date-fns";
import type { Metadata } from "next";
import BlogHeader from "../ui/Header";
import BlogList from "../ui/ItemList";

const PER_PAGE = 10;

type Params = Promise<{
  id: string | string[] | undefined;
  slug: string | string[] | undefined;
}>;

type Props = {
  params: Params;
};

const BlogListPage = async ({ params }: Props) => {
  const entries = await getEntries("all");

  console.log("entries", entries);

  const sortedEntries = entries.sort((a: MDXEntry, b: MDXEntry) =>
    compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date)),
  );
  const { id } = await params;
  const page = id ? parseInt(id[1]) : 1;
  // const totalPages = Math.ceil(entries.length / PER_PAGE);

  let pageEntries = sortedEntries.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  let pinnedEntry: MDXEntry | undefined = undefined;

  if (page === 1) {
    pinnedEntry = entries.find((entry) => {
      return entry.frontmatter.pinned;
    });
  }

  if (pinnedEntry) {
    pageEntries = pageEntries.filter(
      (entry) =>
        !pinnedEntry || entry.frontmatter.slug !== pinnedEntry.frontmatter.slug,
    );
  }

  return (
    <div>
      <BlogHeader />
      {entries.length > 0 && <BlogList items={pageEntries} label="All Posts" />}
    </div>
  );
};

const generateStaticParams = async () => {
  const entries = await getEntries("posts");
  const totalPages = Math.ceil(entries.length / PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    id: i === 0 ? [] : ["page", (i + 1).toString()],
  }));
};

export const metadata: Metadata = {
  title: "Blog posts & notes",
  description: "About tech",
};

export { generateStaticParams };

export default BlogListPage;
