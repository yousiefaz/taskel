"use server";

import { revalidatePath } from "next/cache";

import { TaskStatus } from "../../generated/prisma/client";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function createTask(title: string, description: string) {
  const user = await requireUser();

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
      userId: user.id,
    },
  });

  revalidatePath("/", "layout");
}

export async function updateTask(
  id: string,
  title: string,
  description: string,
) {
  const user = await requireUser();

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    throw new Error("Title is required");
  }

  const result = await prisma.task.updateMany({
    where: {
      id,
      userId: user.id,
    },
    data: {
      title: trimmedTitle,
      description: trimmedDescription || null,
    },
  });

  if (result.count === 0) {
    throw new Error("Task not found");
  }

  revalidatePath("/", "layout");
}

export async function toggleTaskStatus(id: string) {
  const user = await requireUser();

  const task = await prisma.task.findFirst({
    where: {
      id,
      userId: user.id,
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
  const user = await requireUser();

  const result = await prisma.task.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });

  if (result.count === 0) {
    throw new Error("Task not found");
  }

  revalidatePath("/", "layout");
}
