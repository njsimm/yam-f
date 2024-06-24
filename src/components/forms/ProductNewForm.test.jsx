import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import ProductNewForm from "./ProductNewForm";
import { expect, test, vi } from "vitest";

// Mock createProduct function
const mockCreateProduct = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders ProductNewForm component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <ProductNewForm createProduct={mockCreateProduct} />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
