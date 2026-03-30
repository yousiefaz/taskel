"use client";

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

import { ArrowRightLeft, CircleCheck, Edit, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toast } from "sonner";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useTranslations } from "next-intl";

export default function TaskActions({ task }) {
  const actionsT = useTranslations("taskActions");
  const toastT = useTranslations("toasts");

  const { id, title, description, status } = task;

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { toggleTask, updateTask, deleteTask } = useTasks();

  const isDisabled = !editTitle.trim();

  const handleToggleTaskStatus = () => {
    toggleTask(id);
    setTimeout(() => {
      toast(toastT("taskToggled"));
    }, 500);
  };

  const handleEditClick = () => {
    const trimmedTitle = editTitle.trim();
    const trimmedDescription = editDescription.trim();

    updateTask(id, {
      title: trimmedTitle,
      description: trimmedDescription,
    });

    setIsEditDialogOpen(false);

    setTimeout(() => {
      toast(toastT("taskEdited"));
    }, 500);
  };

  const handleDeleteClick = () => {
    deleteTask(id);

    setTimeout(() => {
      toast(toastT("taskDeleted"));
    }, 500);
  };

  const iconButtonProps = {
    variant: "outline",
    size: "icon",
    className: "size-9 rounded-full md:size-10",
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="w-full sm:w-auto">
            <Button
              {...iconButtonProps}
              variant={status === "completed" ? "default" : "outline"}
              onClick={handleToggleTaskStatus}
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
              <Button {...iconButtonProps}>
                <Edit className="size-4 md:size-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{actionsT("editBtn")}</TooltipContent>
        </Tooltip>

        <DialogContent className="w-[calc(100%-1.5rem)] max-w-md rounded-xl p-4 sm:p-6">
          <DialogHeader className="space-y-2 text-center sm:text-start">
            <DialogTitle className="text-lg md:text-xl">
              {actionsT("dialogTitle")}
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base">
              {actionsT("dialogDescription")}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="task-title">{actionsT("TitleLabel")}</Label>
              <Input
                id="task-title"
                value={editTitle}
                placeholder={actionsT("titlePlaceholder")}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-sm md:text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="task-desc">{actionsT("DescriptionLabel")}</Label>
              <Textarea
                id="task-desc"
                value={editDescription}
                placeholder={actionsT("descriptionPlaceholder")}
                onChange={(e) => setEditDescription(e.target.value)}
                className="min-h-28 resize-none text-sm md:text-base"
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                {actionsT("cancelBtn")}
              </Button>
            </DialogClose>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="w-full sm:w-auto">
                  <Button
                    onClick={handleEditClick}
                    disabled={isDisabled}
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

      <AlertDialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button {...iconButtonProps} variant="destructive">
                <Trash2 className="size-4 md:size-5" />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{actionsT("removeBtn")}</TooltipContent>
        </Tooltip>

        <AlertDialogContent className="w-[calc(100%-1.5rem)] max-w-sm rounded-xl p-4 sm:p-6">
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
            <AlertDialogCancel variant="outline" className="w-full sm:w-auto">
              {actionsT("cancelBtn")}
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              onClick={handleDeleteClick}
              className="w-full sm:w-auto"
            >
              {actionsT("deleteBtn")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
