"use server";

import { revalidatePath } from "next/cache";

import { TaskStatus } from "../../generated/prisma/client";
import { prisma } from "@/lib/prisma";

export async function createTask(title: string, description: string) {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    throw new Error("Title is required");
  }

  await prisma.task.create({
    data: {
      title: trimmedTitle,
      description: trimmedDescription || null,
      status: TaskStatus.ACTIVE,
    },
  });

  revalidatePath("/", "layout");
}

export async function updateTask(
  id: string,
  title: string,
  description: string,
) {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    throw new Error("Title is required");
  }

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      title: trimmedTitle,
      description: trimmedDescription || null,
    },
  });

  revalidatePath("/", "layout");
}

export async function toggleTaskStatus(id: string) {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
    select: {
      status: true,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      status:
        task.status === TaskStatus.ACTIVE
          ? TaskStatus.COMPLETED
          : TaskStatus.ACTIVE,
    },
  });

  revalidatePath("/", "layout");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: {
      id,
    },
  });

  revalidatePath("/", "layout");
}
