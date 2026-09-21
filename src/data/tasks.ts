import { TaskStatus as PrismaTaskStatus } from "../../generated/prisma/client";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import type { Task } from "@/types/task.types";

export async function getTasks(): Promise<Task[]> {
  const user = await requireUser();

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    status: task.status === PrismaTaskStatus.COMPLETED ? "completed" : "active",
  }));
}
