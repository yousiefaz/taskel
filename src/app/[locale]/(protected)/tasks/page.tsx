import { getTasks } from "@/data/tasks";

import TaskList from "@/components/common/TaskList";

export default async function Tasks() {
  const tasks = await getTasks();

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-6 md:px-6 md:py-10">
      <TaskList tasks={tasks} />
    </main>
  );
}
