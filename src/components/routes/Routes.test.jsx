import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import YamRoutes from "./Routes";
import { AllProviders, mockUser } from "../../testUtils";
import { test, expect } from "vitest";

test("renders Landing Page component", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/"]}>
      <AllProviders currentUser={mockUser}>
        <YamRoutes />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders Login Form component", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/users/login"]}>
      <AllProviders currentUser={mockUser}>
        <YamRoutes />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders Register Form component", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/users/register"]}>
      <AllProviders currentUser={mockUser}>
        <YamRoutes />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders Dashboard component for authenticated user", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/users/dashboard"]}>
      <AllProviders currentUser={mockUser}>
        <YamRoutes />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
