interface Event {
  date_time: Date;
}

interface Habit {
  id: string;
  name: string;
  state: string;
}

interface HabitDetails {
  id: string;
  name: string;
  description: string;
}

interface EmptyFunction {
  (): void;
}
