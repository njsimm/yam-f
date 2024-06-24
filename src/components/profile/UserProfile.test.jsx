import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, test, expect } from "vitest";
import UserProfile from "./UserProfile";
import UserContext from "../../utils/UserContext";
import SidebarContext from "../../utils/SidebarContext";

// Mock the ProtectedLayout and UserProfileInfo components
vi.mock("../layout/ProtectedLayout", () => ({
  __esModule: true,
  default: ({ children, title }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

vi.mock("./UserProfileInfo", () => ({
  __esModule: true,
  default: ({ updateUser, deleteUser }) => (
    <div>
      <button onClick={() => updateUser({ id: 1, name: "Updated User" })}>
        Update User
      </button>
      <button onClick={() => deleteUser(1)}>Delete User</button>
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

test("renders UserProfile component", () => {
  render(
    <MemoryRouter>
      <UserContext.Provider value={mockUserContext}>
        <SidebarContext.Provider value={mockSidebarContext}>
          <UserProfile updateUser={vi.fn()} deleteUser={vi.fn()} />
        </SidebarContext.Provider>
      </UserContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByText("User Profile")).toBeInTheDocument();
  expect(screen.getByText("Update User")).toBeInTheDocument();
  expect(screen.getByText("Delete User")).toBeInTheDocument();
});
