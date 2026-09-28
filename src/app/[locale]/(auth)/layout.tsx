import { auth } from "@/auth";
import { redirect } from "next/navigation";

import AuthNavbar from "@/components/layout/AuthNavbar";

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

  return (
    <>
      <AuthNavbar />

      <main>{children}</main>
    </>
  );
}
