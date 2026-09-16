"use client";

// import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function SignInForm() {
  // const locale = useLocale();

  return (
    <Link
      href="/sign-up"
      className="text-lg font-semibold leading-6 text-gray-900"
      // locale={locale}
    >
      Sign Up
    </Link>
  );
}
