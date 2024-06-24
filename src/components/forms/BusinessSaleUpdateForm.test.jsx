import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import BusinessSaleUpdateForm from "./BusinessSaleUpdateForm";
import { expect, test, vi } from "vitest";

// Mock updateBusinessSale function
const mockUpdateBusinessSale = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders BusinessSaleUpdateForm component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <BusinessSaleUpdateForm updateBusinessSale={mockUpdateBusinessSale} />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
