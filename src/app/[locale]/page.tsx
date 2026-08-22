import TaskList from "@/components/common/TaskList";
import { TaskProvider } from "@/contexts/TaskContext";
import { getTodos } from "@/data/todos";

export default async function Home() {
  const tasks = await getTodos();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 md:px-6 md:py-10">
      <TaskProvider initialTasks={tasks}>
        <TaskList />
      </TaskProvider>
    </main>
  );
}
