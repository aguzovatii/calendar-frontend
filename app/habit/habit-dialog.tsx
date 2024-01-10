import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import RichTextEditor from "../rich-text-editor/rich-text-editor";
import { Dispatch, SetStateAction } from "react";

interface HabitDialogSubmitFunction {
  (habitName: string, habitDescription: string): void;
}

const EMPTY_HABIT_DESCRIPTION =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

export default function HabitDialog({
  open,
  onOpenChange,
  onSubmitEventHandler,
  defaultHabitName = "",
  defaultHabitDescription = EMPTY_HABIT_DESCRIPTION,
  dialogTitle,
  children,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSubmitEventHandler: HabitDialogSubmitFunction;
  defaultHabitName?: string;
  defaultHabitDescription?: string;
  dialogTitle: string;
  children: ReactNode;
}) {
  const [habitName, setHabitName] = useState(defaultHabitName);
  const [habitDescription, setHabitDescription] = useState(
    defaultHabitDescription,
  );

  useEffect(() => {
    setHabitName(defaultHabitName);
    setHabitDescription(defaultHabitDescription);
  }, [defaultHabitName, defaultHabitDescription]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            className="col-span-3 focus-visible:ring-0 focus-visible:border-lime-500"
            value={habitName}
            onChange={(e) => {
              setHabitName(e.currentTarget.value);
            }}
          />
        </div>
        <div className="grid gap-4 py-4">
          <div className="bg-white relative rounded-sm">
            <RichTextEditor
              defaultEditorState={habitDescription}
              onStateChange={setHabitDescription}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              onSubmitEventHandler(habitName, habitDescription);
              setHabitName(defaultHabitName);
              setHabitDescription(defaultHabitDescription);
            }}
            className="m-1.5 h-7 justify-center rounded-md bg-slate-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
