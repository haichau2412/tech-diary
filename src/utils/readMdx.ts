import { serverSideEvaluateMdx } from "@/utils/mdx";
import { promises as fs } from "fs";
import path from "path";
import type { MDXEntry, MDXEntryType } from "@/types";
import { cache } from "react";

const getEntries = cache(async (type: MDXEntryType): Promise<MDXEntry[]> => {
  const contentDir = path.join(process.cwd(), "src", "blog-content");

  try {
    // Get all files recursively from content directory
    const getFiles = async (dir: string): Promise<string[]> => {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      console.log("entriesentries", entries);
      const files = await Promise.all(
        entries.map(async (entry) => {
          const fullPath = path.join(dir, entry.name);
          return entry.isDirectory() ? getFiles(fullPath) : fullPath;
        }),
      );
      return files.flat();
    };

    // Get all markdown files
    let files = (await getFiles(contentDir)).filter(
      (file) => file.endsWith(".mdx") || file.endsWith(".md"),
    );

    // Filter by type if needed
    if (type !== "all") {
      files = files.filter((file) => {
        const relativePath = path.relative(contentDir, file);
        return relativePath.startsWith(type);
      });
    }

    // Read and process each file
    const entries = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(file, "utf-8");
        return serverSideEvaluateMdx(content);
      }),
    );

    // Finally, remove any drafts
    return entries.filter((entry) => entry?.frontmatter?.draft !== true);
  } catch (error) {
    console.error("Error reading content directory:", error);
    return [];
  }
});

const getAllTags = async (entries: MDXEntry[]): Promise<string[]> => {
  const tagSet = new Set<string>();

  entries.forEach((entry) => {
    if (entry.frontmatter.tags) {
      entry.frontmatter.tags.forEach((tag) => tagSet.add(tag));
    }
  });

  return Array.from(tagSet).sort();
};

const getEntriesForTag = async (entries: MDXEntry[], tag: string) => {
  return entries.filter((entry) => {
    if (entry.frontmatter.tags) {
      return entry.frontmatter.tags.includes(tag);
    }
    return false;
  });
};

export { getAllTags, getEntries, getEntriesForTag };
