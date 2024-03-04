import { Providers } from "@/app/providers";
import ThemeSwitcher from "../theme-switcher";
import { GlowingStarsBackgroundCard } from "components/ui/glowing-stars";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="h-full flex flex-col">
        <div className="h-8 flex flex-row">
          <div className="basis-6">
            <h1 className="text-xl flex h-7 font-bold leading-9 tracking-tight ml-2 pl-0">
              Calendar
            </h1>
          </div>
          <div className="grow"></div>
          <div className="basis-6 flex flex-row">
            <ThemeSwitcher />
          </div>
        </div>
        <GlowingStarsBackgroundCard className="grow relative">
          {children}
        </GlowingStarsBackgroundCard>
      </div>
    </Providers>
  );
}
