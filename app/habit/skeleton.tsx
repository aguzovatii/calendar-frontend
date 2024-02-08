"use client";
import { LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";
import HabitSidebar from "./sidebar";

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
    <div className="h-full flex flex-row">
      <div className="h-full w-7 bg-slate-800 flex flex-col-reverse">
        <LogOut
          color="white"
          className="h-4 w-4 m-1.5 cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
      <div className="h-full flex flex-row flex-1">
        <div className="h-full basis-1/12">
          <HabitSidebar />
        </div>
        <Separator orientation="vertical" className="h-full" />
        <div className="h-full basis-11/12">{children}</div>
      </div>
    </div>
  );
}
