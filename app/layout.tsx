import { Toaster } from "@/components/ui/sonner";
import "./global.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full">
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
