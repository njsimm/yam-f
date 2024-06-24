import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../../testUtils";
import { SidebarProvider } from "../../utils/SidebarContext";
import BusinessNewPage from "./BusinessNewPage";
import { vi, test, expect } from "vitest";

// Mock the form component
vi.mock("../forms/BusinessNewForm", () => ({
  default: function MockBusinessNewForm({ createBusiness }) {
    return <div>Mock Business New Form</div>;
  },
}));

test("renders BusinessNewPage component", () => {
  const mockCreateBusiness = vi.fn();

  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <UserProvider>
        <SidebarProvider>
          <BusinessNewPage createBusiness={mockCreateBusiness} />
        </SidebarProvider>
      </UserProvider>
    </MemoryRouter>
  );

  expect(getByText("Mock Business New Form")).toBeInTheDocument();
  expect(getAllByText("Businesses").length).toBeGreaterThan(0);
});
