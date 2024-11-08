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
    },
    {
      name: "Habits",
      logo: AudioWaveform,
      plan: "Your habits",
    },
  ],
};

export function AppSidebar({ date }: { date: Date }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <ProjectSwitcher projects={data.projects} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker date={date} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
