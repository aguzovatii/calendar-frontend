/**
 * @jest-environment jsdom
 */
import Page from "@/app/dashboard/habits/page";
import { useIsMobile } from "@/components/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import useSwr from "swr";

jest.mock("next-auth/react");
jest.mock("next/navigation");
jest.mock("swr");
jest.mock("@/components/hooks/use-mobile");

it("Habits page has the 'Select a habit to see the details' message", () => {
  (useIsMobile as jest.Mock).mockReturnValue({
    data: false,
  });

  (useSession as jest.Mock).mockReturnValue({
    data: {
      accessToken: "test",
      username: "test",
    },
  });

  (useRouter as jest.Mock).mockReturnValue({
    push: () => {},
  });

  (usePathname as jest.Mock).mockReturnValue({
    includes: (_path: String) => {
      return true;
    },
  });

  (useSwr as jest.Mock).mockReturnValue({
    data: [
      { id: "h1", name: "habit1", state: "Pending" },
      { id: "h2", name: "habit2", state: "Done" },
    ],
    error: null,
    isLoading: false,
    mutate: () => {},
  });

  render(
    <SidebarProvider>
      <Page />
    </SidebarProvider>,
  );
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
    "Select a habit to see the details",
  );
});
