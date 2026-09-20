"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { signIn } from "@/actions/auth.actions";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";
import GoogleButton from "./GoogleButton";

export default function SignInForm() {
  const router = useRouter();

  const t = useTranslations("signInForm");
  const commonT = useTranslations("common");
  const validationT = useTranslations("validation");

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),

    mode: "onBlur",
    reValidateMode: "onChange",

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInInput) {
    setServerError(null);

    try {
      const result = await signIn(data);

      if (!result.success) {
        setServerError(result.message ?? commonT("somethingWentWrong"));

        return;
      }

      router.push("/tasks");
      router.refresh();
    } catch {
      setServerError(commonT("somethingWentWrong"));
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md rounded-3xl border-border/60 shadow-sm">
        <CardHeader className="space-y-2 px-6 pb-6 pt-6 text-center sm:px-8">
          <CardTitle className="text-4xl font-bold tracking-tight">
            {commonT("title")}
          </CardTitle>

          <p className="text-lg text-muted-foreground">{t("description")}</p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="space-y-5 px-6 sm:px-8">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("email.label")}</Label>

              <Input
                id="email"
                type="email"
                placeholder={t("email.placeholder")}
                autoComplete="email"
                autoFocus
                disabled={isSubmitting}
                dir="auto"
                aria-invalid={errors.email?.message ? "true" : "false"}
                aria-describedby={
                  errors.email?.message ? "email-error" : undefined
                }
                {...register("email")}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              {errors.email?.message && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {validationT(errors.email.message)}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{t("password.label")}</Label>

              <Input
                id="password"
                type="password"
                placeholder={t("password.placeholder")}
                autoComplete="current-password"
                disabled={isSubmitting}
                dir="auto"
                aria-invalid={errors.password?.message ? "true" : "false"}
                aria-describedby={
                  errors.password?.message ? "password-error" : undefined
                }
                {...register("password")}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              {errors.password?.message && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {validationT(errors.password.message)}
                </p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <p
                role="alert"
                aria-live="polite"
                dir="auto"
                className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-start text-sm text-destructive"
              >
                {serverError === "invalidCredentials"
                  ? t("errors.invalidCredentials")
                  : commonT("somethingWentWrong")}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-5 px-6 pb-6 pt-6 sm:px-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-xl font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  {t("submitting")}
                </>
              ) : (
                t("submit")
              )}
            </Button>

            <div className="w-full space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />

                <span className="text-xs font-medium uppercase text-muted-foreground">
                  {t("or")}
                </span>

                <div className="h-px flex-1 bg-border" />
              </div>

              <GoogleButton />
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {t("dontHaveAccount")}{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-foreground underline-offset-4 transition-colors hover:underline"
              >
                {t("signUp")}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
