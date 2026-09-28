"use client";

import { useLocale, useTranslations } from "next-intl";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

import TaskActions from "./TaskActions";
import type { Task } from "@/types/task.types";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const t = useTranslations("tasks.status");

  const { title, description, status } = task;

  return (
    <article className="min-w-0 w-full">
      <Card className="my-1 flex min-h-50 w-full min-w-0 flex-col justify-center gap-6">
        <CardHeader className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Badge
            variant={status === "completed" ? "default" : "secondary"}
            className="min-w-21 shrink-0 justify-center text-center"
          >
            {t(status)}
          </Badge>

          <div className="min-w-0 flex-1 space-y-3 text-start">
            <CardTitle
              className="wrap-break-word text-xl font-semibold"
              dir="auto"
            >
              {title}
            </CardTitle>

            {description ? (
              <CardDescription
                className="wrap-break-word whitespace-pre-wrap text-sm font-medium"
                dir="auto"
              >
                {description}
              </CardDescription>
            ) : null}
          </div>
        </CardHeader>

        <CardFooter className="flex w-full justify-end gap-1" dir={direction}>
          <TaskActions task={task} />
        </CardFooter>
      </Card>
    </article>
  );
}
