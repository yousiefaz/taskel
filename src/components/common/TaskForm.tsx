"use client";

import { useState, useTransition } from "react";
import { CirclePlus } from "lucide-react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

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

import { createTask } from "@/actions/task.actions";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Label } from "../ui/label";

export default function TaskForm() {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const formT = useTranslations("taskForm");
  const toastT = useTranslations("toasts");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const isDisabled = !title.trim();

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const handleAddTask = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    startTransition(async () => {
      await createTask(trimmedTitle, trimmedDescription);

      resetForm();
      setIsAddDialogOpen(false);

      toast.success(toastT("taskAdded"), {
        position: "bottom-right",
      });
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
          <span className="truncate">{formT("triggerButton")}</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[calc(100%-1.5rem)] max-w-md rounded-xl p-4 sm:p-6"
        dir={direction}
      >
        <DialogHeader className="space-y-2 text-center sm:text-start">
          <DialogTitle className="text-lg md:text-xl">
            {formT("dialogTitle")}
          </DialogTitle>

          <DialogDescription className="text-sm md:text-base">
            {formT("dialogDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="task-title">{formT("TitleLabel")}</Label>

            <Input
              id="task-title"
              value={title}
              placeholder={formT("titlePlaceholder")}
              onChange={(e) => setTitle(e.target.value)}
              dir="auto"
              className="text-sm md:text-base placeholder:text-start rtl:placeholder:text-end"
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="task-desc">{formT("DescriptionLabel")}</Label>

            <Textarea
              id="task-desc"
              value={description}
              placeholder={formT("descriptionPlaceholder")}
              onChange={(e) => setDescription(e.target.value)}
              dir="auto"
              className="min-h-28 resize-none text-sm md:text-base placeholder:text-start rtl:placeholder:text-end"
              disabled={isPending}
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
              {formT("cancelBtn")}
            </Button>
          </DialogClose>

          <Tooltip>
            <TooltipTrigger asChild>
              <span className="w-full sm:w-auto">
                <Button
                  onClick={handleAddTask}
                  disabled={isDisabled || isPending}
                  className="w-full sm:w-auto"
                >
                  {formT("saveBtn")}
                </Button>
              </span>
            </TooltipTrigger>

            {isDisabled && (
              <TooltipContent>{formT("saveBtnTooltip")}</TooltipContent>
            )}
          </Tooltip>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
