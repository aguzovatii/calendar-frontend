"use client";

import * as React from "react";
import { DatePicker } from "@/components/date-picker";
import { AppSidebar } from "./app-sidebar";

export function TodoSidebar({ date }: { date: Date }) {
  return (
    <AppSidebar projectIndex={0}>
      <DatePicker date={date} />
    </AppSidebar>
  );
}
