export interface Event {
  date_time: Date;
}

export interface Habit {
  id: string;
  name: string;
  state: string;
}

export interface HabitDetails {
  id: string;
  name: string;
  description: string;
}

export interface EmptyFunction {
  (): void;
}

export const EMPTY_HABIT_DESCRIPTION =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
