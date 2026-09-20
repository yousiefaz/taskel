"use server";

import { revalidatePath } from "next/cache";

import { TaskStatus } from "../../generated/prisma/client";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations/task";

export async function createTask(title: string, description: string) {
  const user = await requireUser();

  const result = taskSchema.safeParse({
    title,
    description,
  });

  if (!result.success) {
    throw new Error("Invalid task data");
  }

  const { title: validTitle, description: validDescription } = result.data;

  await prisma.task.create({
    data: {
      title: validTitle,
      description: validDescription || null,
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

  const result = taskSchema.safeParse({
    title,
    description,
  });

  if (!result.success) {
    throw new Error("Invalid task data");
  }

  const { title: validTitle, description: validDescription } = result.data;

  const updateResult = await prisma.task.updateMany({
    where: {
      id,
      userId: user.id,
    },
    data: {
      title: validTitle,
      description: validDescription || null,
    },
  });

  if (updateResult.count === 0) {
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

  await prisma.task.updateMany({
    where: {
      id,
      userId: user.id,
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
    throw new Error(commonT{});
  }

  revalidatePath("/", "layout");
}
