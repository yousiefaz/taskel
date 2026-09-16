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
  const languageT = useTranslations("language");

  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={locale === "en"}
          onClick={() => changeLanguage("en")}
        >
          {languageT("en")}
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={locale === "ar"}
          onClick={() => changeLanguage("ar")}
        >
          {languageT("ar")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
