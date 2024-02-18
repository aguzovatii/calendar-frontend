import { useSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSWR, { Fetcher } from "swr";
import { Badge } from "@/components/ui/badge";
import { Dot } from "lucide-react";
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
    <div className="h-full flex flex-col">
      <div className="grow border rounded-md m-2 shadow-md">
        <div className="h-7 flex flex-row">
          <h1 className="text-xl font-bold text-gray-900 ml-2">Habits</h1>
          <div className="flex h-7">
            <Badge variant="secondary" className="mt-1 ml-1">
              {data!.length}
            </Badge>
          </div>
          <div className="flex h-7 flex-1 flex-row-reverse">
            <HabitCreator onHabitCreatedHandler={mutate} />
          </div>
        </div>
        <ScrollArea className="h-max flex-1">
          {data!.map((habit) => (
            <Link
              key={habit.id}
              className={
                "border-l-2 hover:border-slate-500 ml-3 pl-3 text-slate-600 cursor-pointer pt-2 flex flex-row " +
                (pathname === "/habit/" + habit.id
                  ? "border-slate-500"
                  : "border-slate-300")
              }
              href={"/habit/" + habit.id}
            >
              {habit.name}
              <Dot
                color={
                  "" +
                  (habit.state === "Pending" ? "orange" : "") +
                  (habit.state === "Done" ? "green" : "") +
                  (habit.state === "None" ? "gray" : "")
                }
                className="w-6 h-6"
              />
            </Link>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
