import { useSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSWR, { Fetcher } from "swr";
import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon, CircleDashed, CircleIcon } from "lucide-react";
import HabitCreator from "./creator";
import Link from "next/link";
import { usePathname } from "next/navigation";

const fetcher: Fetcher<Habit[], [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function HabitSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const { data, error, isLoading, mutate } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading</div>;

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full m-2 shadow-md flex flex-col">
        <div className="h-7 flex flex-row">
          <h1 className="text-xl font-bold ml-2">Habits</h1>
          <div className="flex h-7">
            <Badge variant="secondary" className="mt-1 ml-1">
              {data!.length}
            </Badge>
          </div>
          <div className="flex h-7 flex-1 flex-row-reverse">
            <HabitCreator onHabitCreatedHandler={mutate} />
          </div>
        </div>
        <ScrollArea className="h-48 grow">
          {data!.map((habit) => (
            <Link
              key={habit.id}
              className={
                "ml-2 hover:underline pt-2 flex flex-row " +
                (pathname === "/habit/" + habit.id && "font-bold")
              }
              href={"/habit/" + habit.id}
            >
              <div className="flex flex-col justify-center">
                <HabitState
                  state={habit.state}
                  className="mr-2 h-3 w-3 shrink-0"
                />
              </div>
              <h2 className="text-lg flex shrink">{habit.name}</h2>
            </Link>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

export function HabitState({
  state,
  className = "",
}: {
  state: string;
  className?: string;
}) {
  switch (state) {
    case "Pending": {
      return <CircleIcon size={12} className={className} />;
    }
    case "Done": {
      return <CheckCircleIcon size={12} className={className} />;
    }
    case "None": {
      return <CircleDashed size={12} className={className} />;
    }
  }
}
