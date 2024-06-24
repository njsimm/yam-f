import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import BusinessUpdateForm from "./BusinessUpdateForm";
import { expect, test, vi } from "vitest";

// Mock updateBusiness function
const mockUpdateBusiness = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders BusinessUpdateForm component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <BusinessUpdateForm updateBusiness={mockUpdateBusiness} />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
