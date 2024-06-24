import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, test, expect } from "vitest";
import LandingPage from "./LandingPage";
import { UserProvider } from "../../testUtils";

// Mock the UserContext to provide a context value
vi.mock("../../utils/UserContext", () => ({
  __esModule: true,
  default: React.createContext({
    currentUser: null,
    mode: "light",
    toggleTheme: vi.fn(),
  }),
}));

test("renders LandingPage component", async () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <LandingPage />
      </UserProvider>
    </MemoryRouter>
  );

  expect(screen.getByText("yam")).toBeInTheDocument();

  expect(screen.getByText("your. art. matters.")).toBeInTheDocument();

  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Register")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByLabelText("button to toggle theme")).toBeInTheDocument();
  });
});
