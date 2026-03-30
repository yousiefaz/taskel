"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Badge } from "../ui/badge";

import TaskActions from "./TaskActions";
import { useTranslations } from "next-intl";

export default function TaskItem({ task }) {
  const statusT = useTranslations("taskStatus");

  const { title, description, status } = task;

  return (
    <>
      <Card className="min-h-50 my-1 flex flex-col justify-center w-full gap-6">
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
    </>
  );
}
