/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import WelcomePage from "../app/welcome/page";

it("App Router: Works with Client Components (React State)", () => {
  render(<WelcomePage />);
  fireEvent.click(screen.getByRole("button", {
    name: /get started/i
  }));
  expect(screen.getByRole("heading")).toHaveTextContent("1");
});
