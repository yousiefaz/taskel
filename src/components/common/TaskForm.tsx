"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { createTask } from "@/actions/task.actions";
import { taskSchema, type TaskInput } from "@/lib/validations/task";

import {
  Dialog,
  DialogClose,
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
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const title = useWatch({
    control: form.control,
    name: "title",
  });

  const isDisabled = !title?.trim();

  const resetForm = () => {
    form.reset();
  };

  const handleAddTask = (data: TaskInput) => {
    const trimmedTitle = data.title.trim();
    const trimmedDescription = data.description.trim();

    startTransition(async () => {
      const result = await createTask(trimmedTitle, trimmedDescription);

      if (!result.success) {
        toast.error(taskErrorT(result.code));
        return;
      }

      resetForm();
      setIsAddDialogOpen(false);

      toast.success(toastT("taskAdded"));
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
          <CirclePlus className="size-5 shrink-0" />

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
          onSubmit={form.handleSubmit(handleAddTask)}
          className="w-full min-w-0 max-w-full space-y-4 py-2"
        >
          <div className="flex w-full min-w-0 max-w-full flex-col gap-2">
            <Label htmlFor="task-title">{t("titleLabel")}</Label>

            <Input
              id="task-title"
              placeholder={t("titlePlaceholder")}
              dir="auto"
              className="w-full min-w-0 max-w-full text-sm md:text-base placeholder:text-start rtl:placeholder:text-end"
              disabled={isPending}
              {...form.register("title")}
            />

            {form.formState.errors.title && (
              <p className="max-w-full text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="flex w-full min-w-0 max-w-full flex-col gap-2">
            <Label htmlFor="task-desc">{t("descriptionLabel")}</Label>

            <Textarea
              id="task-desc"
              placeholder={t("descriptionPlaceholder")}
              dir="auto"
              className="h-30 max-h-[50vh] w-full min-w-0 max-w-full resize-none overflow-y-hidden overflow-x-hidden wrap-break-word whitespace-pre-wrap text-sm md:text-base placeholder:text-start rtl:placeholder:text-end"
              disabled={isPending}
              {...form.register("description")}
            />

            {form.formState.errors.description && (
              <p className="max-w-full text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                disabled={isPending}
              >
                {t("cancelBtn")}
              </Button>
            </DialogClose>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="w-full sm:w-auto">
                  <Button
                    type="submit"
                    disabled={isDisabled || isPending}
                    className="w-full sm:w-auto"
                  >
                    {t("saveBtn")}
                  </Button>
                </span>
              </TooltipTrigger>

              {isDisabled && (
                <TooltipContent>{t("saveBtnTooltip")}</TooltipContent>
              )}
            </Tooltip>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
