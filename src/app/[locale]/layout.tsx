import type { Metadata } from "next";
import type { ReactNode } from "react";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import { DirectionProvider } from "@/components/ui/direction";
import { routing } from "@/i18n/routing";

import SignOutButton from "@/components/auth/SignOutButton";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return {
    title: "Taskel",
    description:
      locale === "ar" ? "تطبيق لإدارة المهام" : "Task management app",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} className="min-h-screen">
      <DirectionProvider direction={dir}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TooltipProvider>
            {children}

            <Toaster
              position={dir === "rtl" ? "bottom-left" : "bottom-right"}
              dir={dir}
              toastOptions={{
                classNames: {
                  toast: "text-start",
                },
              }}
            />
          </TooltipProvider>
        </NextIntlClientProvider>
      </DirectionProvider>
    </div>
  );
}
