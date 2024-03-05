import { z } from "zod";

export interface Event {
  date_time: Date;
}

export interface Habit {
  id: string;
  name: string;
  state: string;
}

const RecurrenceTypeSchema = z.union([z.literal("Days"), z.literal("Weeks")]);
export type RecurrenceType = z.infer<typeof RecurrenceTypeSchema>;

const WeekDaysSchema = z.union([z.literal("Mon"), z.literal("Tue"), z.literal("Wed"), z.literal("Thu"), z.literal("Fri"), z.literal("Sat"), z.literal("Sun")]);
export type WeekDays = z.infer<typeof WeekDaysSchema>;
export const WeekDaysValues: WeekDays[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DaysRecurrenceSchema = z.object({
  every: z.number().int().positive(),
  from: z.coerce.date(),
});

export type DaysRecurrence = z.infer<typeof DaysRecurrenceSchema>;

const WeeksRecurrenceSchema = z.object({
  every: z.number().int().positive(),
  from: z.coerce.date(),
  on: z.object({
    days: z.array(WeekDaysSchema)
  }),
});

export type WeeksRecurrence = z.infer<typeof WeeksRecurrenceSchema>;

const RecurrenceSchema = z.union([
  z.object({
    rec_type: z.literal("Days"),
    days: DaysRecurrenceSchema,
  }),
  z.object({
    rec_type: z.literal("Weeks"),
    weeks: WeeksRecurrenceSchema,
  }),
]);

export type Recurrence = z.infer<typeof RecurrenceSchema>;

const RecurrenceApiSchema = z.object({
  rec_type: RecurrenceTypeSchema,
  every: z.number().int().positive(),
  from: z.coerce.date(),
  on: z.optional(z.nullable(z.object({
    days: z.array(WeekDaysSchema),
  }))),
})

export type RecurrenceApiType = z.infer<typeof RecurrenceApiSchema>;

export const HabitDetailsSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  recurrence: RecurrenceApiSchema,
});

export type HabitDetails = z.infer<typeof HabitDetailsSchema>;

export interface EmptyFunction {
  (): void;
}

export const EMPTY_HABIT_DESCRIPTION =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
