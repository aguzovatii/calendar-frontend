"use client";
import { LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";
import HabitSidebar from "./sidebar";
import { Button } from "@/components/ui/button";

export default function HabitPageSkeleton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return "Loading...";
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-8 flex flex-row">
        <div className="basis-6">
          <h1 className="text-xl flex h-7 font-bold leading-9 tracking-tight text-gray-900 ml-2 pl-0">
            Calendar
          </h1>
        </div>
        <div className="grow"></div>
        <div className="basis-6">
          <Button
            variant="outline"
            size="icon"
            className="h-6 mt-2 mr-2"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grow flex flex-row flex-1">
        <div className="h-full basis-1/12">
          <HabitSidebar />
        </div>
        <div className="h-full basis-11/12">{children}</div>
      </div>
    </div>
  );
}
