"use client";

import { useContext, useTransition } from "react";

import { TaskContext } from "@/contexts/TaskContext";
import {
  createTodo,
  deleteTodo,
  toggleTodoStatus,
  updateTodo,
} from "@/actions/todo.actions";

import type { UpdateTaskData } from "@/types/task.types";

export function useTasks() {
  const context = useContext(TaskContext);
  const [isPending, startTransition] = useTransition();

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  const { tasks, setTasks } = context;

  const toggleTask = (id: string) => {
    startTransition(async () => {
      const updatedTask = await toggleTodoStatus(id);

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );
    });
  };

  const updateTask = (id: string, updatedData: UpdateTaskData) => {
    startTransition(async () => {
      const updatedTask = await updateTodo(
        id,
        updatedData.title ?? "",
        updatedData.description ?? "",
      );

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task)),
      );
    });
  };

  const deleteTask = (id: string) => {
    startTransition(async () => {
      await deleteTodo(id);

      setTasks((prev) => prev.filter((task) => task.id !== id));
    });
  };

  const addTask = (title: string, description: string) => {
    startTransition(async () => {
      const newTask = await createTodo(title, description);

      setTasks((prev) => [newTask, ...prev]);
    });
  };

  return {
    tasks,
    isPending,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
