"use client";
import TaskList from "@/components/common/TaskList";
import { TaskProvider } from "@/contexts/TaskContext";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 md:px-6 md:py-10">
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    </main>
  );
}
