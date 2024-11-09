import { HabitSidebar } from "@/components/habit-sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HabitSidebar />
      {children}
    </>
  );
}
