import type { MDXModule } from "mdx/types";
import type { TocEntry } from "@stefanprobst/rehype-extract-toc";

export interface Cite {
  name: string;
  url: string;
}

export interface Image {
  url: string;
  cite?: Cite;
}

export interface Revision {
  date: string;
  change: string;
}

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  tags?: string[];
  image?: Image;
  pinned?: boolean;
  featured?: boolean;
  ordering?: number;
  thumbnail?: string;
  slug?: string;
  website?: string;
  revisions?: Revision[];
  draft?: boolean;
  [key: string]: unknown;
}

export interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export type MDXEntryType =
  | "posts"
  | "pages"
  | "projects"
  | "testimonials"
  | "all";

export interface MDXEntry extends MDXModule {
  frontmatter: Frontmatter;
  readingTime: ReadingTime;
  tableOfContents: TocEntry[];
}
