import { v4 as uuidv4 } from "uuid";
import type { Task } from "@/types/task.types";

export const TASKS: Task[] = [
  {
    id: uuidv4(),
    title: "ابدأ باستخدام التطبيق",
    description:
      "اضغط على زر 'إضافة مهمة جديدة' ثم اكتب عنوان ووصف للمهمة، وبعدها اضغط إضافة لعرضها في القائمة.",
    status: "completed",
  },
  {
    id: uuidv4(),
    title: "How to use the app",
    description:
      "Click on 'Add New Task', enter a title and description, then save it. You can mark tasks as completed or delete them anytime.",
    status: "active",
  },
];
