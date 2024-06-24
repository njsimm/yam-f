import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import ChangePasswordForm from "./ChangePasswordForm";
import { expect, test, vi } from "vitest";

// Mock updateUser function
const mockUpdateUser = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders ChangePasswordForm component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <ChangePasswordForm updateUser={mockUpdateUser} />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
