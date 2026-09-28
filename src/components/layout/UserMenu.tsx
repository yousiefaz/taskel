import { auth } from "@/auth";
import { User } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import SignOutButton from "@/components/auth/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserMenuProps = {
  locale: string;
};

export default async function UserMenu({ locale }: UserMenuProps) {
  const session = await auth();

  const t = await getTranslations("navigation.userMenu");

  if (!session?.user) {
    return null;
  }

  const name = session.user.name ?? "User";
  const image = session.user.image ?? "/user-placeholder.png";

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto gap-3 px-2 py-1.5"
          aria-label={t("account")}
        >
          <Avatar className="size-9">
            <AvatarImage src={image} alt={name} />

            <AvatarFallback>
              {initials || <User className="size-4" />}
            </AvatarFallback>
          </Avatar>

          <div className="hidden text-end sm:block">
            <p className="max-w-32 text-nowrap text-base font-medium">{name}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <div className="px-2 py-2">
          <p className="text-sm font-medium">{name}</p>

          {session.user.email && (
            <p className="truncate text-xs text-muted-foreground">
              {session.user.email}
            </p>
          )}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">{t("profile")}</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">{t("settings")}</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-1 py-1">
          <SignOutButton locale={locale} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
