"use client";

import { Button } from "@/components/ui/button";
import useSWR, { useSWRConfig, Fetcher } from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HabitEditor from "../editor";
import RichTextViewer from "@/app/rich-text-editor/rich-text-viewer";
import { BookOpenIcon, ListTodoIcon, SettingsIcon, Trash2 } from "lucide-react";
import { HabitDetails } from "@/app/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TasksDefinitions from "./task-defs";
import TasksDetails from "./tasks-details";

const fetcher: Fetcher<HabitDetails, [string, string]> = ([url, token]) =>
  fetch(url, { headers: { Authorization: "Bearer " + token } }).then((res) =>
    res.json(),
  );

export default function Page({ params }: { params: { habit_id: string } }) {
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();
  const { data: session } = useSession();

  const {
    data: habit,
    error,
    isLoading,
    mutate,
  } = useSWR(
    [
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL +
        "/habit/" +
        params.habit_id,
      session!.accessToken,
    ],
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="h-full flex flex-col">
      <div className="grow border rounded-md mt-2 mr-2 mb-2 shadow-md">
        <div className="flex flex-row ml-1">
          <h1 className="text-xl ml-1">{habit!.name}</h1>
        </div>
        <div>
          <Tabs defaultValue="overview" className="m-2">
            <TabsList>
              <TabsTrigger value="overview">
                <BookOpenIcon size={16} />
                <div className="ml-1">Overview</div>
              </TabsTrigger>
              <TabsTrigger value="tasks">
                <ListTodoIcon size={16} />
                <div className="ml-1">Tasks Definitions</div>
              </TabsTrigger>
              <TabsTrigger value="settings">
                <SettingsIcon size={16} />
                <div className="ml-1">Settings</div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <RichTextViewer editorState={habit!.description} />
              <TasksDetails habitId={params.habit_id} />
            </TabsContent>
            <TabsContent value="tasks">
              <TasksDefinitions habitId={params.habit_id} />
            </TabsContent>
            <TabsContent value="settings">
              <div className="flex flex-col w-[320px]">
                <HabitEditor
                  habit={habit!}
                  onHabitChangeHandler={() => {
                    mutate();
                  }}
                />
                <Button
                  variant="outline"
                  onClick={deleteHabit}
                  className="border-red-900 mt-2"
                >
                  <Trash2 size={16} />
                  <div className="ml-1">Delete habit</div>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );

  function deleteHabit() {
    fetch(
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL +
        "/habit/" +
        params.habit_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session!.accessToken,
        },
      },
    ).then((response) => {
      response.ok ? clean() : alert("The habit could not be deleted");
    });
  }

  function clean() {
    globalMutate([
      process.env.NEXT_PUBLIC_CALENDAR_BACKEND_URL + "/habit",
      session!.accessToken,
    ]);
    router.push("/habits");
  }
}
