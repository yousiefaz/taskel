import { z } from "zod";

export const taskIdSchema = z.string().trim().min(1);

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {
      error: "Title is required",
    })
    .max(200, {
      error: "Title must be less than 200 characters",
    }),

  description: z.string().trim().max(1000, {
    error: "Description must be less than 1000 characters",
  }),
});

// export type TaskIdInput = z.infer<typeof taskIdSchema>;

export type TaskInput = z.infer<typeof taskSchema>;
