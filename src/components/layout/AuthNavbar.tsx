"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

export default function AuthNavbar() {
  const t = useTranslations("navigation.auth");
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  const isSignInPage = pathname === "/sign-in";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-gray-200 transition-shadow duration-200 ${
        isScrolled ? "border-b border-black/10" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex items-center gap-2">
          <Button asChild variant="default" size="sm">
            <Link href={isSignInPage ? "/sign-up" : "/sign-in"}>
              {isSignInPage ? t("signUp") : t("signIn")}
            </Link>
          </Button>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
