"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Tabs, TabsContent } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";

import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import TaskForm from "./TaskForm";

import { useTasks } from "@/hooks/useTasks";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TaskList() {
  const t = useTranslations("tasks");

  const { tasks } = useTasks();

  const activeTasks = tasks.filter((task) => task.status === "active");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const renderTasks = (tasks) => {
    if (tasks.length === 0) {
      return (
        <p className="flex justify-center py-6 text-center text-base text-muted-foreground md:text-xl">
          {t("noTasks")}
        </p>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    );
  };

  return (
    <Card className="mx-auto w-full max-w-5xl rounded-3xl">
      <CardHeader className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-center">
        <div className="hidden md:block" />
        <div>
          <CardTitle className="text-center text-3xl font-bold md:text-5xl">
            {t("title")}
          </CardTitle>
        </div>

        <div className="flex justify-center md:justify-end md:px-4">
          <LanguageSwitcher />
        </div>
      </CardHeader>

      <CardContent className="px-3 md:px-6">
        <Tabs defaultValue="all" className="w-full">
          <TaskFilter />

          <ScrollArea className="h-87 w-full md:h-106" direction="rtl">
            <TabsContent value="all" className="px-4">
              {renderTasks(tasks)}
            </TabsContent>

            <TabsContent value="active" className="px-1 md:px-4">
              {renderTasks(activeTasks)}
            </TabsContent>

            <TabsContent value="completed" className="px-1 md:px-4">
              {renderTasks(completedTasks)}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>

      <CardFooter className="flex w-full justify-center pb-1">
        <TaskForm />
      </CardFooter>
    </Card>
  );
}
