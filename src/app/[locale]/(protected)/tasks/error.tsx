"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("taskList");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-6 md:px-6 md:py-10"
      role="alert"
    >
      <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-bold">{t("errorTitle")}</h2>

        <p className="text-muted-foreground">{t("errorDescription")}</p>

        <Button type="button" onClick={reset}>
          <RefreshCw className="size-4" aria-hidden="true" />
          {t("tryAgain")}
        </Button>
      </div>
    </main>
  );
}
