"use server";

import { TodoStatus } from "../../generated/prisma/client";

import { prisma } from "@/lib/prisma";

export async function createTodo(title: string, description: string) {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    throw new Error("Title is required");
  }

  const todo = await prisma.todo.create({
    data: {
      title: trimmedTitle,
      description: trimmedDescription || null,
      status: TodoStatus.ACTIVE,
    },
  });

  return {
    id: todo.id,
    title: todo.title,
    description: todo.description ?? "",
    status: "active" as const,
  };
}

export async function updateTodo(
  id: string,
  title: string,
  description: string,
) {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    throw new Error("Title is required");
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title: trimmedTitle,
      description: trimmedDescription || null,
    },
  });

  return {
    id: todo.id,
    title: todo.title,
    description: todo.description ?? "",
    status:
      todo.status === TodoStatus.COMPLETED
        ? ("completed" as const)
        : ("active" as const),
  };
}

export async function toggleTodoStatus(id: string) {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      status:
        todo.status === TodoStatus.ACTIVE
          ? TodoStatus.COMPLETED
          : TodoStatus.ACTIVE,
    },
  });

  return {
    id: updatedTodo.id,
    title: updatedTodo.title,
    description: updatedTodo.description ?? "",
    status:
      updatedTodo.status === TodoStatus.COMPLETED
        ? ("completed" as const)
        : ("active" as const),
  };
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
}
