"use client";

import * as z from "zod";

export const registrationSchema = z
  .object({
    username: z.string().min(7).max(50),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .superRefine((val, ctx) => {
        if (!/[A-Z]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["password"],
            message: "Contain at least 1 uppercase character",
          });
        }
        if (!/[a-z]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["password"],
            message: "Contain at least 1 lowercase character",
          });
        }
        if (!/[0-9]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["password"],
            message: "Contain at least 1 number character",
          });
        }
        if (!/[!@#$%^&*]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["password"],
            message: "Contain at least 1 special character (!@#$%^&*)",
          });
        }
      }),

    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().min(7).max(50),
  password: z.string().min(7),
});
