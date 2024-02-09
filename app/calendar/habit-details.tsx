import { Button } from "@/components/ui/button";
import RichTextViewer from "../rich-text-editor/rich-text-viewer";
import useSWR, { useSWRConfig, Fetcher } from "swr";
import HabitEditor from "../habit/habit-editor";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

interface HabitDetails {
  name: string;
  description: string;
}

const fetcher: Fetcher<HabitDetails, [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function HabitDetails({
  habit,
  setCurrentHabit,
}: {
  habit: string;
  setCurrentHabit: Dispatch<SetStateAction<string>>;
}) {
  const { mutate: globalMutate } = useSWRConfig();
  const { data: session } = useSession();

  const { data, error, isLoading, mutate } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit/" + habit,
      session!.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="flex flex-row">
        <h1 className="text-xl ml-1">{habit}</h1>
        <Button
          onClick={deleteHabit}
          className="ml-1 mt-1 h-6 bg-red-800 hover:bg-red-700"
        >
          Delete
        </Button>
        <HabitEditor
          habit={habit}
          habitDescription={data!.description}
          onHabitChangeHandler={(habit) => {
            setCurrentHabit(habit);
            mutate();
          }}
        />
      </div>
      <RichTextViewer editorState={data!.description} className="m-2" />
    </>
  );

  function deleteHabit() {
    fetch(process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit/" + habit, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session!.accessToken,
      },
    }).then((response) => {
      response.ok ? clean() : alert("The habit could not be deleted");
    });
  }

  function clean() {
    setCurrentHabit("");
    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
  }
}
