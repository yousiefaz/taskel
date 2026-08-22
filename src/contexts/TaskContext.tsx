"use client";

import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { Task } from "@/types/task.types";

interface TaskContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

interface TaskProviderProps {
  children: ReactNode;
  initialTasks: Task[];
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export function TaskProvider({ children, initialTasks }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
