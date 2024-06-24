import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import SaleNewForm from "./SaleNewForm";
import { expect, test, vi } from "vitest";

// Mock createSale and createBusinessSale functions
const mockCreateSale = vi.fn();
const mockCreateBusinessSale = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders SaleNewForm component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <SaleNewForm
          createSale={mockCreateSale}
          createBusinessSale={mockCreateBusinessSale}
        />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
