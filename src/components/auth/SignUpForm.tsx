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

import { signUp } from "@/actions/auth.actions";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";

export default function SignUpForm() {
  const router = useRouter();

  const t = useTranslations("signUpForm");
  const commonT = useTranslations("common");

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpInput) {
    setServerError(null);

    try {
      const result = await signUp(data);

      if (!result.success) {
        setServerError(result.message ?? commonT("somethingWentWrong"));

        return;
      }

      router.push("/sign-in");
    } catch {
      setServerError(commonT("somethingWentWrong"));
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md rounded-3xl border-border/60 shadow-sm">
        <CardHeader className="space-y-2 px-6 pb- pt-6 text-center sm:px-8">
          <CardTitle className="text-4xl font-bold tracking-tight">
            {t("title")}
          </CardTitle>

          <p className="text-lg text-muted-foreground">{t("description")}</p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="space-y-5 px-6 sm:px-8">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t("name.label")}</Label>

              <Input
                id="name"
                type="text"
                placeholder={t("name.placeholder")}
                autoComplete="name"
                autoFocus
                disabled={isSubmitting}
                dir="auto"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              {errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("email.label")}</Label>

              <Input
                id="email"
                type="email"
                placeholder={t("email.placeholder")}
                autoComplete="email"
                disabled={isSubmitting}
                dir="auto"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.email.message}
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
                autoComplete="new-password"
                disabled={isSubmitting}
                dir="auto"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password")}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("confirmPassword.label")}
              </Label>

              <Input
                id="confirmPassword"
                type="password"
                placeholder={t("confirmPassword.placeholder")}
                autoComplete="new-password"
                disabled={isSubmitting}
                dir="auto"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                {...register("confirmPassword")}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              {errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <p
                role="alert"
                aria-live="polite"
                className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive"
              >
                {serverError}
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

            <p className="text-center text-sm text-muted-foreground">
              {t("alreadyHaveAccount")}{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-foreground underline-offset-4 transition-colors hover:underline"
              >
                {t("signIn")}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
