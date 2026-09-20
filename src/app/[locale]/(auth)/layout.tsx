import { auth } from "@/auth";
import { redirect } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const { locale } = await params;
  const session = await auth();

  if (session?.user?.id) {
    redirect(`/${locale}/tasks`);
  }

  return children;
}
