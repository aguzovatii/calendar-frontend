"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {currentTheme === "dark" ? (
        <div
          className="flex flex-row gap-2 w-full cursor-default"
          onClick={() => setTheme("light")}
        >
          <SunIcon />
          Light theme
        </div>
      ) : (
        <div
          className="flex flex-row gap-2 w-full cursor-default"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
          Dark theme
        </div>
      )}
    </>
  );
}
