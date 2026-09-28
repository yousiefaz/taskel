"use client";

import { LayoutDashboard, ListTodo, Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  {
    href: "/tasks",
    label: "tasks",
    icon: ListTodo,
  },
  {
    href: "/dashboard",
    label: "dashboard",
    icon: LayoutDashboard,
  },
] as const;

export default function AppNavbarNavigation() {
  const t = useTranslations("navigation.navbar");
  
  const pathname = usePathname();

  return (
    <>
      {/* Desktop navigation */}
      <nav
        className="hidden items-center gap-1 md:flex"
        aria-label={t("mainNavigation")}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Button
              key={item.href}
              asChild
              variant={isActive ? "secondary" : "ghost"}
            >
              <Link href={item.href}>
                <Icon className="size-4" aria-hidden="true" />

                <span>{t(item.label)}</span>
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* Mobile navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={t("openMenu")}
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{t("menu")}</SheetTitle>
            </SheetHeader>

            <nav
              className="mt-6 flex flex-col gap-2"
              aria-label={t("mainNavigation")}
            >
              {navigationItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={isActive ? "secondary" : "ghost"}
                    className="justify-start"
                  >
                    <Link href={item.href}>
                      <Icon className="size-4" aria-hidden="true" />

                      <span>{t(item.label)}</span>
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
