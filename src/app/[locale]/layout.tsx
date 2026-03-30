import { Rubik } from "next/font/google";
import "../globals.css";

import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { DirectionProvider } from "@/components/ui/direction";

const rubik = Rubik({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    title: locale === "ar" ? "تاسكل" : "Taskel",
    description:
      locale === "ar" ? "تطبيق لإدارة المهام" : "Task management app",
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={rubik.className}
      suppressHydrationWarning
    >
      <body>
        <DirectionProvider direction={dir}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </NextIntlClientProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
