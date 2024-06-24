import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import NotAuthorized from "./NotAuthorized";
import { expect, test, vi } from "vitest";

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

test("renders NotAuthorized component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <NotAuthorized />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();

  const headings = screen.getAllByText("Not Authorized");
  expect(headings.length).toBeGreaterThan(0);

  expect(
    screen.getByText("You do not have permission to view this page.")
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
        <NotAuthorized />
      </AllProviders>
    </MemoryRouter>
  );

  const button = screen.getByRole("button", { name: /go to dashboard/i });
  fireEvent.click(button);
  expect(mockNavigate).toHaveBeenCalledWith("/users/dashboard");
});
