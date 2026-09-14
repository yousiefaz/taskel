export type TaskStatus = "active" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
