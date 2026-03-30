export type TaskStatus = "active" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TaskItemProps {
  task: Task;
}

export interface TaskActionsProps {
  task: Task;
}
