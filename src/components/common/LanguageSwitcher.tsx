"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Locale } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("navigation.language");

  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    router.replace(pathname, {
      locale: nextLocale,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={t("label")}
          className="gap-2 rounded-full"
        >
          <Languages className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={locale === "en"}
          onClick={() => changeLanguage("en")}
        >
          {t("en")}
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={locale === "ar"}
          onClick={() => changeLanguage("ar")}
        >
          {t("ar")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
