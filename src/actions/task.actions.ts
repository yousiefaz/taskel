"use server";

import { revalidatePath } from "next/cache";
import { TaskStatus } from "../../generated/prisma/client";

import { UnauthorizedError } from "@/lib/errors";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { taskIdSchema, taskSchema } from "@/lib/validations/task";
import type { ActionResult } from "@/types/action.types";

const TASKS_PATH = "/[locale]/tasks";

function handleActionError(error: unknown): ActionResult | null {
  if (error instanceof UnauthorizedError) {
    return {
      success: false,
      code: "UNAUTHORIZED",
    };
  }

  return null;
}

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
    const result = handleActionError(error);

    if (result) {
      return result;
    }

    throw error;
  }
}

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

    const validId = idResult.data;
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
    const result = handleActionError(error);

    if (result) {
      return result;
    }

    throw error;
  }
}

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

    const result = await prisma.$transaction(async (tx) => {
      const task = await tx.task.findFirst({
        where: {
          id: validId,
          userId: user.id,
        },
        select: {
          status: true,
        },
      });

      if (!task) {
        return false;
      }

      await tx.task.update({
        where: {
          id: validId,
        },
        data: {
          status:
            task.status === TaskStatus.ACTIVE
              ? TaskStatus.COMPLETED
              : TaskStatus.ACTIVE,
        },
      });

      return true;
    });

    if (!result) {
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
    const result = handleActionError(error);

    if (result) {
      return result;
    }

    throw error;
  }
}

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
    const actionError = handleActionError(error);

    if (actionError) {
      return actionError;
    }

    throw error;
  }
}
