import { useContext } from "react";

import { TaskContext } from "../contexts/TaskContext";
import type { UpdateTaskData } from "@/types/task.types";

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  const { tasks, setTasks } = context;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "completed" ? "active" : "completed",
            }
          : item,
      ),
    );
  };

  const updateTask = (id: string, updatedData: UpdateTaskData) => {
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const addTask = (title: string, description: string) => {
    const newTask = {
      id: "a3",
      title,
      description,
      status: "active" as const,
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);

    return updatedTasks;
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
