interface Event {
  date_time: Date;
  id: string;
}

interface Habit {
  name: string;
  state: string;
}

interface EmptyFunction {
  (): void;
}
