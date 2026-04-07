"use client";

import {
  createContext,
  // useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { TASKS } from "../constants/tasks";
import type { Task } from "@/types/task.types";

interface TaskContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(TASKS);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const savedTasks = localStorage.getItem("tasks");
  //     if (savedTasks) {
  //       setTasks(JSON.parse(savedTasks) as Task[]);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
