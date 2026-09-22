"use client";

import { useState, useTransition } from "react";
import {
  ArrowRightLeft,
  CircleCheck,
  Edit,
  Loader2,
  Trash2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "@/actions/task.actions";
import { taskSchema, type TaskInput } from "@/lib/validations/task";
import type { PendingAction } from "@/types/action.types";
import type { Task } from "@/types/task.types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskActionsProps {
  task: Task;
}

export default function TaskActions({ task }: TaskActionsProps) {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const t = useTranslations("taskActions");
  const toastT = useTranslations("toasts");
  const taskErrorT = useTranslations("taskErrors");

  const { id, title, description, status } = task;

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const [, startTransition] = useTransition();

  const editForm = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title,
      description: description ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = editForm;

  const isActionPending = pendingAction !== null;
  const isTogglePending = pendingAction === "toggle";
  const isEditPending = pendingAction === "edit";
  const isDeletePending = pendingAction === "delete";

  const resetEditForm = () => {
    reset({
      title,
      description: description ?? "",
    });
  };

  const handleToggleTaskStatus = () => {
    if (isActionPending) return;

    setPendingAction("toggle");

    startTransition(async () => {
      try {
        const result = await toggleTaskStatus(id);

        if (!result.success) {
          toast.error(taskErrorT(result.code));
          return;
        }

        toast.success(toastT("taskToggled"));
      } catch {
        toast.error(toastT("unknownError"));
      } finally {
        setPendingAction(null);
      }
    });
  };

  const handleEditSubmit = (data: TaskInput) => {
    if (isActionPending) return;

    const trimmedTitle = data.title.trim();
    const trimmedDescription = data.description.trim();

    setPendingAction("edit");

    startTransition(async () => {
      try {
        const result = await updateTask(id, trimmedTitle, trimmedDescription);

        if (!result.success) {
          toast.error(taskErrorT(result.code));
          return;
        }

        setIsEditDialogOpen(false);

        reset({
          title: trimmedTitle,
          description: trimmedDescription,
        });

        toast.success(toastT("taskEdited"));
      } catch {
        toast.error(toastT("unknownError"));
      } finally {
        setPendingAction(null);
      }
    });
  };

  const handleDeleteTask = () => {
    if (isActionPending) return;

    setPendingAction("delete");

    startTransition(async () => {
      try {
        const result = await deleteTask(id);

        if (!result.success) {
          toast.error(taskErrorT(result.code));
          return;
        }

        setIsDeleteDialogOpen(false);

        toast.success(toastT("taskDeleted"));
      } catch {
        toast.error(toastT("unknownError"));
      } finally {
        setPendingAction(null);
      }
    });
  };

  const iconButtonProps = {
    type: "button" as const,
    variant: "outline" as const,
    size: "icon" as const,
    className: "size-9 rounded-full md:size-10",
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">
            <Button
              {...iconButtonProps}
              variant={status === "completed" ? "default" : "outline"}
              onClick={handleToggleTaskStatus}
              disabled={isActionPending}
              aria-busy={isTogglePending}
              aria-label={t("toggleStatusBtn")}
            >
              {isTogglePending ? (
                <Loader2
                  className="size-4 animate-spin md:size-5"
                  aria-hidden="true"
                />
              ) : status === "completed" ? (
                <CircleCheck className="size-4 md:size-5" aria-hidden="true" />
              ) : (
                <ArrowRightLeft
                  className="size-4 md:size-5"
                  aria-hidden="true"
                />
              )}
            </Button>
          </span>
        </TooltipTrigger>

        <TooltipContent>{t("toggleStatusBtn")}</TooltipContent>
      </Tooltip>

      {/* Edit */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          if (isActionPending) return;

          setIsEditDialogOpen(open);

          if (open) {
            resetEditForm();
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <span className="inline-flex">
                <Button
                  {...iconButtonProps}
                  disabled={isActionPending}
                  aria-busy={isEditPending}
                  aria-label={t("editBtn")}
                >
                  <Edit className="size-4 md:size-5" aria-hidden="true" />
                </Button>
              </span>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{t("editBtn")}</TooltipContent>
        </Tooltip>

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
            onSubmit={handleSubmit(handleEditSubmit)}
            className="w-full min-w-0 max-w-full space-y-4 py-2"
            noValidate
          >
            <div className="flex w-full min-w-0 max-w-full flex-col gap-2">
              <Label htmlFor={`edit-task-title-${id}`}>{t("titleLabel")}</Label>

              <Input
                id={`edit-task-title-${id}`}
                placeholder={t("titlePlaceholder")}
                dir="auto"
                disabled={isEditPending}
                aria-invalid={!!errors.title}
                aria-describedby={
                  errors.title ? `edit-task-title-error-${id}` : undefined
                }
                className="w-full min-w-0 max-w-full text-sm md:text-base placeholder:text-start rtl:placeholder:text-end"
                {...register("title")}
              />

              {errors.title?.message && (
                <p
                  id={`edit-task-title-error-${id}`}
                  role="alert"
                  className="max-w-full text-sm text-destructive"
                >
                  {taskErrorT(errors.title.message)}
                </p>
              )}
            </div>

            <div className="flex w-full min-w-0 max-w-full flex-col gap-2">
              <Label htmlFor={`edit-task-description-${id}`}>
                {t("descriptionLabel")}
              </Label>

              <Textarea
                id={`edit-task-description-${id}`}
                placeholder={t("descriptionPlaceholder")}
                dir="auto"
                disabled={isEditPending}
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description
                    ? `edit-task-description-error-${id}`
                    : undefined
                }
                className="min-h-28 max-h-[50vh] w-full min-w-0 max-w-full resize-none overflow-x-hidden overflow-y-auto wrap-break-word whitespace-pre-wrap text-sm md:text-base placeholder:text-start rtl:placeholder:text-end"
                {...register("description")}
              />

              {errors.description?.message && (
                <p
                  id={`edit-task-description-error-${id}`}
                  role="alert"
                  className="max-w-full text-sm text-destructive"
                >
                  {taskErrorT(errors.description.message)}
                </p>
              )}
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  disabled={isActionPending}
                >
                  {t("cancelBtn")}
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={!isValid || isEditPending}
                className="w-full sm:w-auto"
                aria-busy={isEditPending}
              >
                {isEditPending ? (
                  <>
                    <Loader2
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                    {t("saving")}
                  </>
                ) : (
                  t("saveBtn")
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (isActionPending) return;

          setIsDeleteDialogOpen(open);
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <span className="inline-flex">
                <Button
                  {...iconButtonProps}
                  variant="destructive"
                  disabled={isActionPending}
                  aria-busy={isDeletePending}
                  aria-label={t("removeBtn")}
                >
                  <Trash2 className="size-4 md:size-5" aria-hidden="true" />
                </Button>
              </span>
            </AlertDialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{t("removeBtn")}</TooltipContent>
        </Tooltip>

        <AlertDialogContent
          className="w-[calc(100%-1.5rem)] max-w-sm rounded-xl p-4 sm:p-6"
          dir={direction}
        >
          <AlertDialogHeader className="text-center sm:text-start">
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2 className="size-7" aria-hidden="true" />
            </AlertDialogMedia>

            <AlertDialogTitle className="text-lg md:text-xl">
              {t("alertDialogTitle")}
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm md:text-base">
              {t("alertDialogDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <AlertDialogCancel
              variant="outline"
              className="w-full sm:w-auto"
              disabled={isActionPending}
            >
              {t("cancelBtn")}
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              onClick={(event) => {
                event.preventDefault();
                handleDeleteTask();
              }}
              disabled={isActionPending}
              className="w-full sm:w-auto"
              aria-busy={isDeletePending}
            >
              {isDeletePending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  {t("deleting")}
                </>
              ) : (
                t("deleteBtn")
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
