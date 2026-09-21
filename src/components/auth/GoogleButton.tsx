"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface GoogleButtonProps {
  disabled?: boolean;
}

export default function GoogleButton({ disabled = false }: GoogleButtonProps) {
  const locale = useLocale();
  const t = useTranslations("googleAuth");

  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleSignIn() {
    if (disabled || isLoading) return;

    setIsLoading(true);

    try {
      await signIn("google", {
        callbackUrl: `/${locale}/tasks`,
      });
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full rounded-xl font-semibold"
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={handleGoogleSignIn}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          {t("loading")}
        </>
      ) : (
        <>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
            <path
              fill="#4285F4"
              d="M21.35 12.27c0-.79-.07-1.54-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
            />
            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"
            />
            <path
              fill="#FBBC05"
              d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.63H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.37l3.25-2.53Z"
            />
            <path
              fill="#EA4335"
              d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.17 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.38l3.25 2.53c.77-2.31 2.92-4.03 5.46-4.03Z"
            />
          </svg>

          {t("continueWithGoogle")}
        </>
      )}
    </Button>
  );
}
