/**
 * @jest-environment jsdom
 */
import HabitSidebar from "@/app/habit/sidebar";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSwr from "swr";

jest.mock("next-auth/react");
jest.mock("next/navigation");
jest.mock("swr");

it("HabitSidebar has the 'Habits' title", () => {
  (useSession as jest.Mock).mockReturnValue({
    data: {
      accessToken: "test",
    },
  });

  (useRouter as jest.Mock).mockReturnValue({
    push: () => {}
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

  render(<HabitSidebar />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Habits");
});
