"use client";

import { useState, useTransition } from "react";
import { ArrowRightLeft, CircleCheck, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import {
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "@/actions/task.actions";

import type { Task } from "@/types/task.types";

interface TaskActionsProps {
  task: Task;
}

export default function TaskActions({ task }: TaskActionsProps) {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const actionsT = useTranslations("taskActions");
  const toastT = useTranslations("toasts");

  const { id, title, description, status } = task;

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const isDisabled = !editTitle.trim();

  const handleToggleTaskStatus = () => {
    startTransition(async () => {
      await toggleTaskStatus(id);

      toast(toastT("taskToggled"));
    });
  };

  const handleEditClick = () => {
    const trimmedTitle = editTitle.trim();
    const trimmedDescription = editDescription.trim();

    startTransition(async () => {
      await updateTask(id, trimmedTitle, trimmedDescription);

      setIsEditDialogOpen(false);

      toast(toastT("taskEdited"));
    });
  };

  const handleDeleteClick = () => {
    startTransition(async () => {
      await deleteTask(id);

      toast(toastT("taskDeleted"));
    });
  };

  const iconButtonProps = {
    variant: "outline" as const,
    size: "icon" as const,
    className: "size-9 rounded-full md:size-10",
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Toggle task status */}
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button
              {...iconButtonProps}
              variant={status === "completed" ? "default" : "outline"}
              onClick={handleToggleTaskStatus}
              disabled={isPending}
            >
              {status === "completed" ? (
                <CircleCheck className="size-4 md:size-5" />
              ) : (
                <ArrowRightLeft className="size-4 md:size-5" />
              )}
            </Button>
          </span>
        </TooltipTrigger>

        <TooltipContent>{actionsT("toggleStatusBtn")}</TooltipContent>
      </Tooltip>
      {/* Toggle task status */}

      {/* Edit task */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);

          if (open) {
            setEditTitle(title);
            setEditDescription(description);
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button {...iconButtonProps} disabled={isPending}>
                <Edit className="size-4 md:size-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{actionsT("editBtn")}</TooltipContent>
        </Tooltip>

        <DialogContent
          className="w-[calc(100%-1.5rem)] max-w-md rounded-xl p-4 sm:p-6"
          dir={direction}
        >
          <DialogHeader className="space-y-2 text-center sm:text-start">
            <DialogTitle className="text-start text-lg md:text-xl">
              {actionsT("dialogTitle")}
            </DialogTitle>

            <DialogDescription className="text-sm md:text-base">
              {actionsT("dialogDescription")}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`edit-task-title-${id}`}>
                {actionsT("TitleLabel")}
              </Label>

              <Input
                id={`edit-task-title-${id}`}
                value={editTitle}
                placeholder={actionsT("titlePlaceholder")}
                onChange={(e) => setEditTitle(e.target.value)}
                dir="auto"
                className="text-sm md:text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={`edit-task-desc-${id}`}>
                {actionsT("DescriptionLabel")}
              </Label>

              <Textarea
                id={`edit-task-desc-${id}`}
                value={editDescription}
                placeholder={actionsT("descriptionPlaceholder")}
                onChange={(e) => setEditDescription(e.target.value)}
                dir="auto"
                className="min-h-28 resize-none text-sm md:text-base"
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                disabled={isPending}
              >
                {actionsT("cancelBtn")}
              </Button>
            </DialogClose>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="w-full sm:w-auto">
                  <Button
                    onClick={handleEditClick}
                    disabled={isDisabled || isPending}
                    className="w-full sm:w-auto"
                  >
                    {actionsT("saveBtn")}
                  </Button>
                </span>
              </TooltipTrigger>

              {isDisabled && (
                <TooltipContent>{actionsT("saveBtnTooltip")}</TooltipContent>
              )}
            </Tooltip>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit task */}

      {/* Delete task */}
      <AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                {...iconButtonProps}
                variant="destructive"
                disabled={isPending}
              >
                <Trash2 className="size-4 md:size-5" />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{actionsT("removeBtn")}</TooltipContent>
        </Tooltip>

        <AlertDialogContent
          className="w-[calc(100%-1.5rem)] max-w-sm rounded-xl p-4 sm:p-6"
          dir={direction}
        >
          <AlertDialogHeader className="text-center sm:text-start">
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2 className="size-5" />
            </AlertDialogMedia>

            <AlertDialogTitle className="text-lg md:text-xl">
              {actionsT("alertDialogTitle")}
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm md:text-base">
              {actionsT("alertDialogDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <AlertDialogCancel
              variant="outline"
              className="w-full sm:w-auto"
              disabled={isPending}
            >
              {actionsT("cancelBtn")}
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              onClick={handleDeleteClick}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {actionsT("deleteBtn")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Delete task */}
    </div>
  );
}
