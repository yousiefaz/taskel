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

export default function LanguageSwitcher() {
  const languageT = useTranslations("language");

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (nextLocale) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Languages className="size-4" />
            <span>{languageT("switch")}</span>
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
    </>
  );
}
