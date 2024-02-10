import HabitPageSkeleton from "./skeleton";
import { Providers } from "@/app/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <HabitPageSkeleton>{children}</HabitPageSkeleton>
    </Providers>
  );
}
