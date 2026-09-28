import { getTasks } from "@/data/tasks";
import TaskList from "@/components/common/TaskList";
import PageContainer from "@/components/layout/PageContainer";

export default async function Tasks() {
  const tasks = await getTasks();

  return (
    <PageContainer>
      <div className="mx-auto w-full max-w-5xl">
        <TaskList tasks={tasks} />
      </div>
    </PageContainer>
  );
}
