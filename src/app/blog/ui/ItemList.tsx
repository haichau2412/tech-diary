import Link from "next/link";
import DateFormatter from "./DateFormatter";
import type { MDXEntry } from "@/types";
import { renderDescription } from "@/utils/mdx";

async function SumaryItem({ item }: { item: MDXEntry }) {
  const descriptionHtml = await renderDescription(item.frontmatter.description);

  return (
    <div className="border border-amber-100 p-4">
      <p className="callout-1">
        <DateFormatter dateString={item.frontmatter.date} />
      </p>
      <h2 className="heading-2 mt-2 text-2xl lg:mt-4 lg:text-4xl">
        <Link
          className="hover:underline"
          href={`/blog/${item.frontmatter.slug}`}
        >
          {item.frontmatter.title}
        </Link>
      </h2>
      <div
        className="mt-2 italic lg:mt-4"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      ></div>
    </div>
  );
}

const ItemList = ({ items }: { items: MDXEntry[]; label: string }) => {
  return (
    <section className="flex w-full flex-col border-t border-t-black pt-8 md:py-12 lg:flex-row lg:pt-24">
      <div className="w-full md:w-3/4 lg:w-8/12">
        <ul className="flex flex-col gap-12 md:gap-16 lg:gap-24">
          {items.map((item: MDXEntry, index: number) => {
            return (
              <li key={index}>
                <SumaryItem item={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ItemList;
