"use server";

import { revalidatePath } from "next/cache";

import { TaskStatus } from "../../generated/prisma/client";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { taskIdSchema, taskSchema } from "@/lib/validations/task";
import type { ActionResult } from "@/types/action.types";
import { UnauthorizedError } from "@/lib/errors";

const TASKS_PATH = "/[locale]/tasks";

// Create task
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

    revalidatePath(TASKS_PATH, "page");

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        code: "UNAUTHORIZED",
      };
    }

    throw error;
  }
}
// Create task

// Update task
export async function updateTask(
  id: string,
  title: string,
  description: string,
): Promise<ActionResult> {
  try {
    const user = await requireUser();

    const idResult = taskIdSchema.safeParse(id);

    if (!idResult.success) {
      return {
        success: false,
        code: "TASK_NOT_FOUND",
      };
    }

    const validId = idResult.data;

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
        id: validId,
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

    revalidatePath(TASKS_PATH, "page");

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        code: "UNAUTHORIZED",
      };
    }

    throw error;
  }
}
// Update task

// Toggle task status
export async function toggleTaskStatus(id: string): Promise<ActionResult> {
  try {
    const user = await requireUser();

    const idResult = taskIdSchema.safeParse(id);

    if (!idResult.success) {
      return {
        success: false,
        code: "TASK_NOT_FOUND",
      };
    }

    const validId = idResult.data;

    const task = await prisma.task.findFirst({
      where: {
        id: validId,
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
        id: validId,
        userId: user.id,
      },
      data: {
        status:
          task.status === TaskStatus.ACTIVE
            ? TaskStatus.COMPLETED
            : TaskStatus.ACTIVE,
      },
    });

    revalidatePath(TASKS_PATH, "page");

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        code: "UNAUTHORIZED",
      };
    }

    throw error;
  }
}
// Toggle task status

// Delete task
export async function deleteTask(id: string): Promise<ActionResult> {
  try {
    const user = await requireUser();

    const idResult = taskIdSchema.safeParse(id);

    if (!idResult.success) {
      return {
        success: false,
        code: "TASK_NOT_FOUND",
      };
    }

    const validId = idResult.data;

    const result = await prisma.task.deleteMany({
      where: {
        id: validId,
        userId: user.id,
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        code: "TASK_NOT_FOUND",
      };
    }

    revalidatePath(TASKS_PATH, "page");

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return {
        success: false,
        code: "UNAUTHORIZED",
      };
    }

    throw error;
  }
}
// Delete task
