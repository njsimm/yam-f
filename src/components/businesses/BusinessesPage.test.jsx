import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import BusinessesPage from "./BusinessesPage";
import { expect, test, vi } from "vitest";

// Mock deleteBusiness function
const mockDeleteBusiness = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders BusinessesPage component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <BusinessesPage deleteBusiness={mockDeleteBusiness} />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
