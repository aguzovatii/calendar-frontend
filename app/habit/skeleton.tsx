"use client";
import { LogOut, MenuIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import HabitSidebar from "./sidebar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ThemeSwitcher from "../theme-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-6 mt-2 ml-2 md:hidden"
            >
              <MenuIcon className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 m-0 pt-6"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <div className="h-full p-0">
              <HabitSidebar />
            </div>
          </SheetContent>
        </Sheet>

        <div className="basis-6">
          <h1 className="text-xl flex h-7 font-bold leading-9 tracking-tight ml-2 pl-0">
            Calendar
          </h1>
        </div>
        <div className="grow"></div>
        <div className="basis-6 flex flex-row">
          <ThemeSwitcher />
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
        <div className="h-full hidden md:flex md:basis-2/12">
          <HabitSidebar />
        </div>
        <div className="h-full min-w-64 w-full md:basis-10/12 ml-2 md:ml-0">
          {children}
        </div>
      </div>
    </div>
  );
}
