"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { format, parse } from "date-fns";
import Session from "../session";

export default function Page({ params }: { params: { date: string } }) {
  const date = parse(params.date, "dd-MM-yyyy", new Date());

  if (isNaN(date.getTime())) {
    return <div>Error</div>;
  }

  console.log(date);

  return (
    <SidebarProvider>
      <AppSidebar date={date} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard/todo">To do</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={"/dashboard/todo?day=" + format(date, "dd-MM-yyyy")}
                  >
                    {format(date, "PP")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex w-full h-full justify-center">
          <div className="flex flex-col w-[920px]">
            <Session date={date} today={date} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
