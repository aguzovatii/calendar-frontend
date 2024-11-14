import { Providers } from "@/app/providers";
import ThemeSwitcher from "../theme-switcher";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="h-full flex flex-col">
        <div className="flex flex-row">
          <div className="basis-6">
            <h1 className="text-xl flex h-7 font-bold leading-9 tracking-tight ml-2 pl-0">
              Calendar
            </h1>
          </div>
          <div className="grow"></div>
          <div className="flex flex-row">
            <div className="m-2 px-1 rounded-md hover:bg-accent hover:text-accent-foreground">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
        <div className="grow h-48">{children}</div>
      </div>
    </Providers>
  );
}
