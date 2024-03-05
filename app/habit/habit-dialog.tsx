import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";
import RichTextEditor from "../rich-text-editor/rich-text-editor";
import { Dispatch, SetStateAction } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DaysRecurrence, EMPTY_HABIT_DESCRIPTION, RecurrenceApiType, RecurrenceType, WeekDays, WeekDaysValues, WeeksRecurrence } from "../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface HabitDialogSubmitFunction {
  (habitName: string, habitDescription: string, rec: RecurrenceApiType): Promise<void>;
}

const formSchema = z.object({
  name: z.string().min(1),
  recurrence: z.object({
    days: z.object({
      every: z.coerce.number().int().positive(),
    }),
    weeks: z.object({
      every: z.coerce.number().int().positive(),
    }),
  })
});

const today = new Date();
today.setHours(0, 0, 0, 0);
const DEFAULT_RECURRENCE: RecurrenceApiType = {rec_type: "Days", every: 1, from: today};

export default function HabitDialog({
  open,
  onOpenChange,
  onSubmitEventHandler,
  defaultHabitName = "",
  defaultHabitDescription = EMPTY_HABIT_DESCRIPTION,
  defaultRec = DEFAULT_RECURRENCE,
  dialogTitle,
  children,
}: {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    onSubmitEventHandler: HabitDialogSubmitFunction;
    defaultHabitName?: string;
    defaultHabitDescription?: string;
    defaultRec?: RecurrenceApiType;
    dialogTitle: string;
    children: ReactNode;
  }) {

  const defaultInternalRec = (() => {
    switch (defaultRec.rec_type) {
      case "Days":
        return {rec_type: defaultRec.rec_type, days: { every: defaultRec.every, from: defaultRec.from}, weeks: {every: 1, from: defaultRec.from, on: { days: [WeekDaysValues[defaultRec.from!.getDay()]] }}};
      case "Weeks":
        return {rec_type: defaultRec.rec_type, days: { every: 1, from: defaultRec.from}, weeks: {every: defaultRec.every, from: defaultRec.from, on: defaultRec.on!}};
    }
  })();

  const [habitDescription, setHabitDescription] = useState(
    defaultHabitDescription,
  );

  const form = useForm<z.infer<typeof formSchema> & { serverError: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultHabitName,
      recurrence: {
        days: {
          every: defaultInternalRec.days.every,
        },
        weeks: {
          every: defaultInternalRec.weeks.every,
        },
      }
    },
  }); 

  const [rec, setRec] = useState<InternalRecurrence>(defaultInternalRec);

  useEffect(() => {
    form.setValue("name", defaultHabitName);
    setHabitDescription(defaultHabitDescription);
    setRec(defaultInternalRec);
    form.setValue("recurrence.days.every", defaultInternalRec.days.every);
    form.setValue("recurrence.weeks.every", defaultInternalRec.weeks.every);
  }, [defaultHabitName, defaultHabitDescription, defaultRec]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const simple_rec = (() => {
      switch (rec.rec_type) {
        case "Days":
          return {rec_type: rec.rec_type, every: rec.days.every, from: rec.days.from };
        case "Weeks":
          return {rec_type: rec.rec_type, every: rec.weeks.every, from: rec.weeks.from, on: rec.weeks.on};
      }})();

    onSubmitEventHandler(values.name, habitDescription, simple_rec).then(() => {
      setHabitDescription(defaultHabitDescription);
      form.reset();
      setRec(defaultInternalRec);
    }).catch((reason) => {
        form.setError("serverError", {
          message: `${reason}`,
        });
      }); 
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="overflow-y-scroll max-h-screen"
      >
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative">
              <RichTextEditor
                defaultEditorState={habitDescription}
                onStateChange={setHabitDescription}
              />
            </div>
            <div>
              <Label>Recurrence</Label>
              <Tabs value={rec.rec_type} className="w-full" onValueChange={(newType) => {setRec({...rec, rec_type: newType as RecurrenceType})}}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="Days">Days</TabsTrigger>
                  <TabsTrigger value="Weeks">Weeks</TabsTrigger>
                </TabsList>
                <TabsContent value="Days">
                  <div className="flex flex-row items-center">
                    <Label className="w-9">Every</Label>
                    <FormField
                      control={form.control}
                      name="recurrence.days.every"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" className="ml-2 max-w-24" onChange={e => { field.onChange(e.target.value); setRec({...rec, days: {...rec.days, every: +e.target.value}});}}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Label className="ml-2">days</Label>
                  </div>
                  <div className="flex flex-row items-center mt-2">
                    <Label className="w-9">From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal ml-2",
                            !rec.days.from && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {rec.days.from ? format(rec.days.from, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          required={true}
                          mode="single"
                          selected={rec.days.from}
                          onSelect={(newFrom) => {setRec({...rec, days: {...rec.days, from: newFrom as Date}})}}
                          className="rounded-md border"
                          showOutsideDays
                          fixedWeeks
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </TabsContent>
                <TabsContent value="Weeks">
                  <div className="flex flex-row items-center">
                    <Label className="w-9">Every</Label>
                    <FormField
                      control={form.control}
                      name="recurrence.weeks.every"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" className="ml-2 max-w-24" onChange={e => { field.onChange(e.target.value); setRec({...rec, weeks: {...rec.weeks, every: +e.target.value}}); }}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Label className="ml-2">weeks</Label>
                  </div>
                  <div className="flex flex-row items-center mt-2">
                    <Label className="w-9">From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal ml-2",
                            !rec.weeks.from && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {rec.weeks.from ? format(rec.weeks.from, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          required={true}
                          mode="single"
                          selected={rec.weeks.from}
                          onSelect={(newFrom) => { setRec({...rec, weeks: {...rec.weeks, from: newFrom as Date}});}}
                          className="rounded-md border"
                          showOutsideDays
                          fixedWeeks
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-row items-center mt-2">
                    <Label className="w-9">On</Label>
                    <ToggleGroup type="multiple" variant="outline" className="ml-2" onValueChange={(value: WeekDays[]) => { setRec({...rec, weeks: {...rec.weeks, on: { days: value }}});}} value={rec.weeks.on.days}>
                      <ToggleGroupItem value="Mon" aria-label="Toggle monday">
                        Mon
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Tue" aria-label="Toggle tuesday">
                        Tue
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Wed" aria-label="Toggle wednesday">
                        Wed
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Thu" aria-label="Toggle thursday">
                        Thu
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Fri" aria-label="Toggle friday">
                        Fri
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Sat" aria-label="Toggle saturday">
                        Sat
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Sun" aria-label="Toggle sunday">
                        Sun
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <Button type="submit" variant="outline" className="w-full">
              Done
            </Button>
            {form.formState.errors.serverError && (
              <div className="grid place-items-center">
                <FormMessage>
                  {form.formState.errors.serverError.message}
                </FormMessage>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface InternalRecurrence {
  rec_type: RecurrenceType;
  days: DaysRecurrence;
  weeks: WeeksRecurrence;
}

