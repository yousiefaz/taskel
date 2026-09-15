import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, {
        error: "Name must be at least 2 characters",
      })
      .max(100, {
        error: "Name must be less than 100 characters",
      }),

    email: z
      .email({
        error: "Please enter a valid email address",
      })
      .transform((email) => email.trim().toLowerCase()),

    password: z
      .string()
      .min(8, {
        error: "Password must be at least 8 characters",
      })
      .max(72, {
        error: "Password must be less than 72 characters",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
  });

export const signInSchema = z.object({
  email: z
    .email({ error: "Please enter a valid email address" })
    .transform((email) => email.trim().toLowerCase()),

  password: z.string().min(1, {
    error: "Password is required",
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
