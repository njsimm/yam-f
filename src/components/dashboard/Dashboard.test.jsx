import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../../testUtils";
import { SidebarProvider } from "../../utils/SidebarContext";
import Dashboard from "./Dashboard";
import { vi, test, expect } from "vitest";

// Mock the dependent components
vi.mock("./Chart", () => ({
  default: function MockChart() {
    return <div>Mock Chart</div>;
  },
}));

vi.mock("./TotalMoney", () => ({
  default: function MockTotalMoney() {
    return <div>Mock Total Money</div>;
  },
}));

vi.mock("./Sales", () => ({
  default: function MockSales() {
    return <div>Mock Sales</div>;
  },
}));

test("renders Dashboard component", () => {
  const { getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <SidebarProvider>
          <Dashboard />
        </SidebarProvider>
      </UserProvider>
    </MemoryRouter>
  );

  expect(getByText("Mock Chart")).toBeInTheDocument();
  expect(getByText("Mock Total Money")).toBeInTheDocument();
  expect(getByText("Mock Sales")).toBeInTheDocument();
});
