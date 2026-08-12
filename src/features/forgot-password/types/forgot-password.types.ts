import { z } from "zod";

export const requestSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export const verifySchema = z.object({
  code: z
    .string()
    .min(6, { message: "Verification code must be 6 digits" })
    .max(6, { message: "Verification code must be 6 digits" }),
});

export const resetSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TRequestRequest = z.infer<typeof requestSchema>;
export type TVerifyRequest = z.infer<typeof verifySchema>;
export type TResetRequest = z.infer<typeof resetSchema>;
