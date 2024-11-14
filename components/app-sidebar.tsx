"use client";

import * as React from "react";
import { AudioWaveform, ListTodo } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { ProjectSwitcher } from "@/components/project-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  projects: [
    {
      name: "To do",
      logo: ListTodo,
      plan: "Your tasks",
      path: "/app/todos",
    },
    {
      name: "Habits",
      logo: AudioWaveform,
      plan: "Your habits",
      path: "/app/habits",
    },
  ],
};

export function AppSidebar({
  projectIndex,
  children,
}: {
  projectIndex: number;
  children: React.ReactNode;
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <ProjectSwitcher projectIndex={projectIndex} projects={data.projects} />
      </SidebarHeader>
      <SidebarContent>{children}</SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
