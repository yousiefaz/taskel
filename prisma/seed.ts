import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TaskStatus } from "../generated/prisma/client";

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

  const user = await prisma.user.upsert({
    where: {
      email: "demo@taskel.dev",
    },
    update: {},
    create: {
      name: "Taskel Demo",
      email: "demo@taskel.dev",
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: "ابدأ باستخدام التطبيق",
        description:
          "اضغط على زر 'إضافة مهمة جديدة' ثم اكتب عنوان ووصف للمهمة، وبعدها اضغط إضافة لعرضها في القائمة.",
        status: TaskStatus.COMPLETED,
        userId: user.id,
      },
      {
        title: "How to use the app",
        description:
          "Click on 'Add New Task', enter a title and description, then save it. You can mark tasks as completed or delete them anytime.",
        status: TaskStatus.ACTIVE,
        userId: user.id,
      },
    ],
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
