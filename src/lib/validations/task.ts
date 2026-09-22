import { z } from "zod";

export const taskIdSchema = z.string().trim().min(1, {
  error: "invalidId",
});

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {
      error: "titleRequired",
    })
    .max(200, {
      error: "titleMax",
    }),

  description: z.string().trim().max(1000, {
    error: "descriptionMax",
  }),
});

export type TaskInput = z.infer<typeof taskSchema>;
