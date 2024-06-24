import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import SalesUpdateForm from "./SaleUpdateForm";
import { expect, test, vi } from "vitest";

// Mock updateSale function
const mockUpdateSale = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders SalesUpdateForm component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <SalesUpdateForm updateSale={mockUpdateSale} />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
