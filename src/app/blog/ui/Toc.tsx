import { MDXEntry } from "@/types";

const TOCSection = ({ entry }: { entry: MDXEntry }) => {
  if (!entry.tableOfContents || entry.tableOfContents.length === 0) {
    return <></>;
  }

  return (
    <ol className="flex flex-col gap-4">
      {entry.tableOfContents
        .filter((item) => item.depth == 2)
        .map((item, i) => {
          return (
            <li
              className=""
              key={i}
              style={{
                paddingLeft: `${item.depth - 2 * 10}px`,
              }}
            >
              <a className="hover:underline" href={`#${item.value}`}>
                {item.value}
              </a>
            </li>
          );
        })}
    </ol>
  );
};

export default TOCSection;
