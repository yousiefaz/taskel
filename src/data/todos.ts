import { TodoStatus } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";
import type { Task } from "@/types/task.types";

export async function getTodos(): Promise<Task[]> {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    description: todo.description ?? "",
    status: todo.status === TodoStatus.COMPLETED ? "completed" : "active",
  }));
}
