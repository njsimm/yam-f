import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AllProviders, mockUser } from "../../testUtils";
import { expect, test } from "vitest";

test("renders protected Dashboard component for authenticated user", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/users/dashboard"]}>
      <AllProviders currentUser={mockUser}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/users/dashboard" element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("redirects to Not Authorized for unauthenticated user", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/users/dashboard"]}>
      <AllProviders currentUser={null}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/users/dashboard" element={<div>Dashboard</div>} />
          </Route>
          <Route path="/not-authorized" element={<div>Not Authorized</div>} />
        </Routes>
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
