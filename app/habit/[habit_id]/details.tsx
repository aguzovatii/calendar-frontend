import { Button } from "@/components/ui/button";
import useSWR, { useSWRConfig, Fetcher } from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HabitEditor from "../editor";
import RichTextViewer from "@/app/rich-text-editor/rich-text-viewer";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HabitDetails } from "@/app/types";

const fetcher: Fetcher<HabitDetails, [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function HabitDetails({ habit }: { habit: string }) {
  const router = useRouter();
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
      <div className="flex flex-row ml-1">
        <h1 className="text-xl ml-1">{data!.name}</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-6 mt-1 ml-1"
                onClick={deleteHabit}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete habit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <HabitEditor
          habit={data!}
          onHabitChangeHandler={() => {
            mutate();
          }}
        />
      </div>
      <RichTextViewer editorState={data!.description} />
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
    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
    router.push("/habit");
  }
}
