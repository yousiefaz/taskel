import { auth } from "@/auth";
import { redirect } from "next/navigation";

import AppNavbar from "@/components/layout/AppNavbar";

type ProtectedLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function ProtectedLayout({
  children,
  params,
}: ProtectedLayoutProps) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/${locale}/sign-in`);
  }

  return (
    <>
      <AppNavbar locale={locale} />

      <main>{children}</main>
    </>
  );
}
