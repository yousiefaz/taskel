"use client";

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

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { toast } from "sonner";
import { CirclePlus } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";

export default function TaskForm() {
  const formT = useTranslations("taskForm");
  const toastT = useTranslations("toasts");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { addTask } = useTasks();

  const isDisabled = !title.trim();

  const handleAddTask = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    addTask(trimmedTitle, trimmedDescription);

    setTitle("");
    setDescription("");
    setIsAddDialogOpen(false);

    toast.success(toastT("taskAdded"), { position: "top-center" });
  };

  return (
    <>
      <Dialog
        open={isAddDialogOpen}
        onOpenChange={(open) => {
          setIsAddDialogOpen(open);

          if (open) {
            setTitle("");
            setDescription("");
          }
        }}
      >
        <DialogTrigger asChild>
          <Button size="lg" className="flex mx-auto w-full gap-2 md:w-50">
            <CirclePlus className="size-5 shrink-0" />
            <span className="truncate">{formT("triggerButton")}</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[calc(100%-1.5rem)] max-w-md rounded-xl p-4 sm:p-6">
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
                className="text-sm md:text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="task-desc">{formT("DescriptionLabel")}</Label>
              <Textarea
                id="task-desc"
                value={description}
                placeholder={formT("descriptionPlaceholder")}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-28 resize-none text-sm md:text-base"
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                {formT("cancelBtn")}
              </Button>
            </DialogClose>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="w-full sm:w-auto">
                  <Button
                    onClick={handleAddTask}
                    disabled={isDisabled}
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
    </>
  );
}
