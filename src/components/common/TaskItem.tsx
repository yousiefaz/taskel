"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useLocale, useTranslations } from "next-intl";

import TaskActions from "./TaskActions";
import type { Task } from "@/types/task.types";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const t = useTranslations("taskStatus");

  const { title, description, status } = task;

  return (
    <div className="min-w-0 flex flex-1 flex-col gap-3 text-start">
      <Card className="my-1 flex min-h-50 w-full flex-col justify-center gap-6">
        <CardHeader className="flex items-center justify-start gap-4">
          <Badge
            variant={status === "completed" ? "default" : "secondary"}
            className="min-w-21 text-center"
          >
            {t(status)}
          </Badge>

          <div className="min-w-0 flex flex-1 flex-col gap-3 text-start">
            <CardTitle className="text-xl font-semibold" dir="auto">
              {title}
            </CardTitle>

            <CardDescription className="text-sm font-medium" dir="auto">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardFooter className="flex w-full justify-end gap-1" dir={direction}>
          <TaskActions task={task} />
        </CardFooter>
      </Card>
    </div>
  );
}
