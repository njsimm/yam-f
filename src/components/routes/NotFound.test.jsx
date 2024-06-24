import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import NotFound from "./NotFound";
import { expect, test, vi } from "vitest";

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

test("renders NotFound component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <NotFound />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByText("404 - Not Found")).toBeInTheDocument();
  expect(
    screen.getByText("The page you are looking for does not exist.")
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /go to dashboard/i })
  ).toBeInTheDocument();
});

test("navigates to dashboard on button click", () => {
  const mockNavigate = vi.fn();
  useNavigate.mockReturnValue(mockNavigate);

  render(
    <MemoryRouter>
      <AllProviders>
        <NotFound />
      </AllProviders>
    </MemoryRouter>
  );

  const button = screen.getByRole("button", { name: /go to dashboard/i });
  fireEvent.click(button);
  expect(mockNavigate).toHaveBeenCalledWith("/users/dashboard");
});
