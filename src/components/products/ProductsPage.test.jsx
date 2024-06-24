import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, test, expect } from "vitest";
import ProductsPage from "./ProductsPage";
import UserContext from "../../utils/UserContext";
import SidebarContext from "../../utils/SidebarContext";

// Mock the ProtectedLayout and ProductsList components
vi.mock("../layout/ProtectedLayout", () => ({
  __esModule: true,
  default: ({ children, title }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

vi.mock("./ProductsList", () => ({
  __esModule: true,
  default: ({ deleteProduct }) => (
    <div>
      <button onClick={() => deleteProduct(1)}>Delete Product</button>
    </div>
  ),
}));

const mockUserContext = {
  currentUser: { id: 1, name: "Test User" },
  mode: "light",
  toggleTheme: vi.fn(),
};

const mockSidebarContext = {
  isSidebarOpen: false,
  toggleSidebar: vi.fn(),
};

test("renders ProductsPage component", () => {
  render(
    <MemoryRouter>
      <UserContext.Provider value={mockUserContext}>
        <SidebarContext.Provider value={mockSidebarContext}>
          <ProductsPage deleteProduct={vi.fn()} />
        </SidebarContext.Provider>
      </UserContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText("Products")).toBeInTheDocument();
  expect(screen.getByText("Delete Product")).toBeInTheDocument();
});
