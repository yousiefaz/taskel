import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(4, {
        error: "nameMin",
      })
      .max(100, {
        error: "nameMax",
      }),

    email: z
      .email({
        error: "emailInvalid",
      })
      .transform((email) => email.trim().toLowerCase()),

    password: z
      .string()
      .min(8, {
        error: "passwordMin",
      })
      .max(72, {
        error: "passwordMax",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "passwordMismatch",
  });

export const signInSchema = z.object({
  email: z
    .email({
      error: "emailInvalid",
    })
    .transform((email) => email.trim().toLowerCase()),

  password: z.string().min(1, {
    error: "passwordRequired",
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
