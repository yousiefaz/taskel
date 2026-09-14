import TaskList from "@/components/common/TaskList";
import { getTasks } from "@/data/tasks";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-6 md:px-6 md:py-10">
      <TaskList tasks={tasks} />
    </main>
  );
}
