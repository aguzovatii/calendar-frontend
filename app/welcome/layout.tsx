import { Providers } from "@/app/providers";
import ThemeSwitcher from "../theme-switcher";
import { SparklesCore } from "components/ui/sparkles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="h-full flex flex-col overflow-hidden">
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
        <div className="h-full w-full absolute overflow-hidden -z-20">
          <SparklesCore
            background="black"
            minSize={0.6}
            maxSize={1.9}
            particleDensity={110}
            className="w-full h-full"
            particleColor="#14b8a6"
          />
        </div>
        {children}
      </div>
    </Providers>
  );
}
