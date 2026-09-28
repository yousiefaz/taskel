"use client";

import { useTranslations } from "next-intl";

import { signOutUser } from "@/actions/auth.actions";

import { Button } from "../ui/button";

type SignOutButtonProps = {
  locale: string;
};

export default function SignOutButton({ locale }: SignOutButtonProps) {
  const t = useTranslations("navigation.signOut");

  return (
    <form action={signOutUser.bind(null, locale)}>
      <Button
        variant="destructive"
        type="submit"
        className="w-full justify-start text-destructive"
      >
        {t("label")}
      </Button>
    </form>
  );
}
