"use client";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import HabitSidebar from "./sidebar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 mt-2 mr-2"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex flex-row grow">
        <div className="h-full basis-2/12">
          <HabitSidebar />
        </div>
        <div className="h-full basis-10/12">{children}</div>
      </div>
    </div>
  );
}
