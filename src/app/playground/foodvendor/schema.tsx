import { z } from "zod";

const ContentNameSchema = z.object({
  en: z.string().min(1, "Display name is required").optional(),
  vn: z.string().min(1, "Display name is required").optional(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: ContentNameSchema,
});

export const condimentSchema = z.object({
  name: ContentNameSchema,
  id: z.string(),
  description: z.string().optional(),
  options: z.array(z.string()).optional(),
});

export const dishSchema = z.object({
  name: ContentNameSchema,
  description: ContentNameSchema,
  price: z.object({
    currency: z.string().min(1, "Currency is required"),
    value: z.number().positive("Must be a positive vaue"),
  }),
  condiments: z.array(condimentSchema).optional(),
  belongTo: z.array(z.string()),
});
