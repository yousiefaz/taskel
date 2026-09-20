"use client";

import { Circle, CircleCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import GoogleButton from "./GoogleButton";

export default function SignUpForm() {
  const router = useRouter();

  const t = useTranslations("signUpForm");
  const commonT = useTranslations("common");
  const validationT = useTranslations("validation");

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),

    mode: "onBlur",
    reValidateMode: "onChange",

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const passwordMinLengthValid = password.length >= 8;

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
        <CardHeader className="space-y-2 px-6 pt-6 text-center sm:px-8">
          <CardTitle className="text-4xl font-bold tracking-tight">
            {commonT("title")}
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
                aria-invalid={
                  touchedFields.name && errors.name ? "true" : "false"
                }
                aria-describedby={
                  touchedFields.name && errors.name ? "name-error" : undefined
                }
                {...register("name")}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              {touchedFields.name && errors.name?.message && (
                <p
                  id="name-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {validationT(errors.name.message)}
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
                aria-invalid={
                  touchedFields.email && errors.email ? "true" : "false"
                }
                aria-describedby={
                  touchedFields.email && errors.email
                    ? "email-error"
                    : undefined
                }
                {...register("email")}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              {touchedFields.email && errors.email?.message && (
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
                autoComplete="new-password"
                disabled={isSubmitting}
                dir="auto"
                aria-invalid={
                  touchedFields.password && errors.password ? "true" : "false"
                }
                aria-describedby={
                  touchedFields.password && errors.password
                    ? "password-requirements password-error"
                    : "password-requirements"
                }
                {...register("password", {
                  onChange: () => {
                    if (touchedFields.confirmPassword) {
                      void trigger("confirmPassword");
                    }
                  },
                })}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              <div
                id="password-requirements"
                className="ms-2 text-xs text-muted-foreground"
              >
                <p
                  className={`flex items-center gap-1.5 ${
                    passwordMinLengthValid
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {passwordMinLengthValid ? (
                    <CircleCheck className="size-3" aria-hidden="true" />
                  ) : (
                    <Circle className="size-3" aria-hidden="true" />
                  )}

                  {t("password.requirements.minLength")}
                </p>
              </div>

              {touchedFields.password && errors.password?.message && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {validationT(errors.password.message)}
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
                aria-invalid={
                  touchedFields.confirmPassword && errors.confirmPassword
                    ? "true"
                    : "false"
                }
                aria-describedby={
                  touchedFields.confirmPassword && errors.confirmPassword
                    ? "confirm-password-error"
                    : undefined
                }
                {...register("confirmPassword")}
                className="h-11 rounded-xl placeholder:text-start rtl:placeholder:text-end"
              />

              {touchedFields.confirmPassword &&
                errors.confirmPassword?.message && (
                  <p
                    id="confirm-password-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {validationT(errors.confirmPassword.message)}
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
                {serverError === "emailAlreadyExists"
                  ? t("errors.emailAlreadyExists")
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

            <div className="space-y-4 w-full">
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
