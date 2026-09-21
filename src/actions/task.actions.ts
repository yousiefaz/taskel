"use server";

import { revalidatePath } from "next/cache";

import { TaskStatus } from "../../generated/prisma/client";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations/task";
import type { ActionResult } from "@/types/action.types";

export async function createTask(
  title: string,
  description: string,
): Promise<ActionResult> {
  try {
    const user = await requireUser();

    const result = taskSchema.safeParse({
      title,
      description,
    });

    if (!result.success) {
      return {
        success: false,
        code: "INVALID_TASK_DATA",
      };
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

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return {
        success: false,
        code: "UNAUTHORIZED",
      };
    }

    throw error;
  }
}

export async function updateTask(
  id: string,
  title: string,
  description: string,
): Promise<ActionResult> {
  try {
    const user = await requireUser();

    const result = taskSchema.safeParse({
      title,
      description,
    });

    if (!result.success) {
      return {
        success: false,
        code: "INVALID_TASK_DATA",
      };
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
      return {
        success: false,
        code: "TASK_NOT_FOUND",
      };
    }

    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return {
        success: false,
        code: "UNAUTHORIZED",
      };
    }

    throw error;
  }
}

export async function toggleTaskStatus(id: string): Promise<ActionResult> {
  try {
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
      return {
        success: false,
        code: "TASK_NOT_FOUND",
      };
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

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return {
        success: false,
        code: "UNAUTHORIZED",
      };
    }

    throw error;
  }
}

export async function deleteTask(id: string): Promise<ActionResult> {
  try {
    const user = await requireUser();

    const result = await prisma.task.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        code: "TASK_NOT_FOUND",
      };
    }

    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return {
        success: false,
        code: "UNAUTHORIZED",
      };
    }

    throw error;
  }
}
