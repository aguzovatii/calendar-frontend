"use client";
import { ThemeProvider as ExternalThemeProvider } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExternalThemeProvider enableSystem={true} attribute="class">
      {children}
    </ExternalThemeProvider>
  );
}
