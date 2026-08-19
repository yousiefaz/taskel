import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TodoStatus } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.todo.upsert({
    where: {
      id: "seed-getting-started-ar",
    },
    update: {
      title: "ابدأ باستخدام التطبيق",
      description:
        "اضغط على زر 'إضافة مهمة جديدة' ثم اكتب عنوان ووصف للمهمة، وبعدها اضغط إضافة لعرضها في القائمة.",
      status: TodoStatus.COMPLETED,
    },
    create: {
      id: "seed-getting-started-ar",
      title: "ابدأ باستخدام التطبيق",
      description:
        "اضغط على زر 'إضافة مهمة جديدة' ثم اكتب عنوان ووصف للمهمة، وبعدها اضغط إضافة لعرضها في القائمة.",
      status: TodoStatus.COMPLETED,
    },
  });

  await prisma.todo.upsert({
    where: {
      id: "seed-getting-started-en",
    },
    update: {
      title: "How to use the app",
      description:
        "Click on 'Add New Task', enter a title and description, then save it. You can mark tasks as completed or delete them anytime.",
      status: TodoStatus.ACTIVE,
    },
    create: {
      id: "seed-getting-started-en",
      title: "How to use the app",
      description:
        "Click on 'Add New Task', enter a title and description, then save it. You can mark tasks as completed or delete them anytime.",
      status: TodoStatus.ACTIVE,
    },
  });

  console.log("✅ Database seeded");
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
