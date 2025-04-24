import React from "react";

interface ComponentProps {
  children: React.ReactNode;
}

const Paragraph = ({ children }: ComponentProps) => {
  return <p className="mdx-paragraph">{children}</p>;
};

const Ahref = ({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a className="mdx-a" href={href} {...props}>
      {children}
    </a>
  );
};

const Ul = ({ children }: React.ComponentPropsWithoutRef<"ul">) => {
  return <ul className="mdx-list list-disc">{children}</ul>;
};

const Ol = ({ children }: React.ComponentPropsWithoutRef<"ol">) => {
  return <ol className="mdx-list list-decimal">{children}</ol>;
};

const Li = ({ children }: React.ComponentPropsWithoutRef<"li">) => {
  return <li className="mdx-list-item">{children}</li>;
};

const H1 = ({ children }: React.ComponentPropsWithoutRef<"h1">) => {
  return (
    <h1 className="mt-8 mb-4 text-3xl font-bold lg:mt-14 lg:mb-8 2xl:mt-20 2xl:mb-10 2xl:text-4xl">
      {children}
    </h1>
  );
};

const H2 = ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
  return (
    <h2
      className="mt-8 mb-4 text-2xl font-bold lg:mt-14 lg:mb-8 2xl:mt-20 2xl:mb-10 2xl:text-4xl"
      {...props}
    >
      {children}
    </h2>
  );
};

const Em = ({ children }: React.ComponentPropsWithoutRef<"em">) => {
  return <em>{children}</em>;
};

const Strong = ({ children }: React.ComponentPropsWithoutRef<"strong">) => {
  return <strong>{children}</strong>;
};

const Hr = () => {
  return <hr />;
};

const Pre = ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => {
  return (
    <pre className="mdx-code" {...props}>
      {children}
    </pre>
  );
};

const Blockquote = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"blockquote">) => {
  return (
    <blockquote className="mdx-blockquote" {...props}>
      {children}
    </blockquote>
  );
};

const MDXComponents = {
  hr: Hr,
  p: Paragraph,
  a: Ahref,
  em: Em,
  strong: Strong,
  ol: Ol,
  ul: Ul,
  li: Li,
  h1: H1,
  h2: H2,
  pre: Pre,
  blockquote: Blockquote,
};

export default MDXComponents;
