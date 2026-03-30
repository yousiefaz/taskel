"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { useTranslations } from "next-intl";

import TaskActions from "./TaskActions";
import type { TaskItemProps } from "@/types/task.types";

export default function TaskItem({ task }: TaskItemProps) {
  const statusT = useTranslations("taskStatus");

  const { title, description, status } = task;

  return (
    <Card className="my-1 flex min-h-50 w-full flex-col justify-center gap-6">
      <CardHeader className="flex items-center justify-start gap-4">
        <Badge
          variant={status === "completed" ? "default" : "secondary"}
          className="min-w-20"
        >
          {statusT(status)}
        </Badge>

        <div className="flex flex-col gap-3">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm font-medium">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardFooter className="flex w-full justify-end gap-1">
        <TaskActions task={task} />
      </CardFooter>
    </Card>
  );
}
