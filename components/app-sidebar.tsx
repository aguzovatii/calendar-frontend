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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "To do",
      logo: ListTodo,
      plan: "Your tasks",
      path: "/dashboard/todos",
    },
    {
      name: "Habits",
      logo: AudioWaveform,
      plan: "Your habits",
      path: "/dashboard/habits",
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
