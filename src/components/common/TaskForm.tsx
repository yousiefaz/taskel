"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createTask } from "@/actions/task.actions";
import { taskSchema, type TaskInput } from "@/lib/validations/task";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function TaskForm() {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const t = useTranslations("taskForm");
  const toastT = useTranslations("toasts");
  const taskErrorT = useTranslations("taskErrors");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const resetForm = () => {
    reset({
      title: "",
      description: "",
    });
  };

  const handleAddTask = (data: TaskInput) => {
    const title = data.title.trim();
    const description = data.description.trim();

    startTransition(async () => {
      try {
        const result = await createTask(title, description);

        if (!result.success) {
          toast.error(taskErrorT(result.code));
          return;
        }

        resetForm();
        setIsAddDialogOpen(false);

        toast.success(toastT("taskAdded"));
      } catch {
        toast.error(toastT("unknownError"));
      }
    });
  };

  return (
    <Dialog
      open={isAddDialogOpen}
      onOpenChange={(open) => {
        if (isPending) return;

        setIsAddDialogOpen(open);

        if (open) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" className="mx-auto flex w-full gap-2 md:w-50">
          <CirclePlus className="size-5 shrink-0" aria-hidden="true" />

          <span className="truncate">{t("triggerButton")}</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[calc(100%-1.5rem)] max-w-md rounded-xl p-4 sm:p-6"
        dir={direction}
      >
        <DialogHeader className="space-y-2 text-center sm:text-start">
          <DialogTitle className="text-lg md:text-xl">
            {t("dialogTitle")}
          </DialogTitle>

          <DialogDescription className="text-sm md:text-base">
            {t("dialogDescription")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleAddTask)}
          className="w-full min-w-0 max-w-full space-y-4 py-2"
          noValidate
        >
          {/* Title */}
          <div className="flex w-full min-w-0 max-w-full flex-col gap-2">
            <Label htmlFor="task-title">{t("titleLabel")}</Label>

            <Input
              id="task-title"
              placeholder={t("titlePlaceholder")}
              dir="auto"
              disabled={isPending}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "task-title-error" : undefined}
              className="w-full min-w-0 max-w-full text-sm md:text-base placeholder:text-start rtl:placeholder:text-end"
              {...register("title")}
            />

            {errors.title?.message && (
              <p
                id="task-title-error"
                role="alert"
                className="max-w-full text-sm text-destructive"
              >
                {taskErrorT(errors.title.message)}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex w-full min-w-0 max-w-full flex-col gap-2">
            <Label htmlFor="task-description">{t("descriptionLabel")}</Label>

            <Textarea
              id="task-description"
              placeholder={t("descriptionPlaceholder")}
              dir="auto"
              disabled={isPending}
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "task-description-error" : undefined
              }
              className="h-30 max-h-[50vh] w-full min-w-0 max-w-full resize-none overflow-x-hidden overflow-y-auto wrap-break-word whitespace-pre-wrap text-sm md:text-base placeholder:text-start rtl:placeholder:text-end"
              {...register("description")}
            />

            {errors.description?.message && (
              <p
                id="task-description-error"
                role="alert"
                className="max-w-full text-sm text-destructive"
              >
                {taskErrorT(errors.description.message)}
              </p>
            )}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              disabled={isPending}
              onClick={() => setIsAddDialogOpen(false)}
            >
              {t("cancelBtn")}
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex w-full sm:w-auto">
                  <Button
                    type="submit"
                    disabled={!isValid || isPending}
                    className="w-full sm:w-auto"
                    aria-busy={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2
                          className="size-4 animate-spin"
                          aria-hidden="true"
                        />
                        {t("adding")}
                      </>
                    ) : (
                      t("saveBtn")
                    )}
                  </Button>
                </span>
              </TooltipTrigger>

              {!isValid && !isPending && (
                <TooltipContent>{t("saveBtnTooltip")}</TooltipContent>
              )}
            </Tooltip>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
