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
import { DatePicker } from "@/components/date-picker";
import { AppSidebar } from "./app-sidebar";

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
      path: "/dashboard/todo",
    },
    {
      name: "Habits",
      logo: AudioWaveform,
      plan: "Your habits",
      path: "/dashboard/habits",
    },
  ],
};

export function TodoSidebar({ date }: { date: Date }) {
  return (
    <AppSidebar projectIndex={0}>
      <DatePicker date={date} />
    </AppSidebar>
  );
}
