import React from "react";
import { render } from "@testing-library/react";
import UserContext from "./utils/UserContext";
import SidebarContext from "./utils/SidebarContext";
import { vi } from "vitest"; // Import vi from vitest

// Mock user data
export const mockUser = {
  id: 1,
  email: "demo@example.com",
  username: "demoUser",
  password: "password123",
  first_name: "Demo",
  last_name: "User",
  is_admin: false,
  date_created: "2024-06-24T12:00:00.000Z",
};

// Mock sidebar context data
export const mockSidebarContext = {
  isSidebarOpen: true,
  toggleSidebar: vi.fn(),
};

// UserProvider component to wrap components with UserContext
const UserProvider = ({ children, currentUser = mockUser }) => {
  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// SidebarProvider component to wrap components with SidebarContext
const SidebarProvider = ({ children, sidebarContext = mockSidebarContext }) => {
  return (
    <SidebarContext.Provider value={sidebarContext}>
      {children}
    </SidebarContext.Provider>
  );
};

const AllProviders = ({
  children,
  currentUser = mockUser,
  sidebarContext = mockSidebarContext,
}) => {
  return (
    <UserProvider currentUser={currentUser}>
      <SidebarProvider sidebarContext={sidebarContext}>
        {children}
      </SidebarProvider>
    </UserProvider>
  );
};

export * from "@testing-library/react";
export { UserProvider, SidebarProvider, AllProviders };
