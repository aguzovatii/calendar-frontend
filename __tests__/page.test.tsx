/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import HabitPage from "../app/habit/habit-page";
import {useSession} from "next-auth/react";
import useSwr from "swr";

jest.mock("next-auth/react");
jest.mock("swr");

it("App Router: Works with Client Components (React State)", () => {

  (useSession as jest.Mock).mockReturnValue({
    data: {
      accessToken: "test",
    },
    status: "authenticated",
  });

  (useSwr as jest.Mock).mockReturnValue({
    data: [{name: "habit1",}, {name: "habit2"}],
    error: null, 
    isLoading: false, 
    mutate: () => {}, 
  });

  render(<HabitPage currentHabit="test" setCurrentHabit={() => {}} />);
  expect(screen.getByRole("heading").textContent).toBe("Habits");
});
