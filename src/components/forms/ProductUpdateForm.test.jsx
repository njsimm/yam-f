import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import ProductUpdateForm from "./ProductUpdateForm";
import { expect, test, vi } from "vitest";

// Mock onSave and onCancel functions
const mockOnSave = vi.fn();
const mockOnCancel = vi.fn();

test("renders ProductUpdateForm component", () => {
  const product = {
    name: "Sample Product",
    description: "This is a sample product",
    price: 10.0,
    cost: 5.0,
    sku: "12345",
    minutesToMake: 30,
    type: "Sample Type",
    quantity: 100,
  };

  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <ProductUpdateForm
          product={product}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
        />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
