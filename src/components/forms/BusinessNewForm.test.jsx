import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import BusinessNewForm from "./BusinessNewForm";
import { expect, test, vi } from "vitest";

// Mock createBusiness function
const mockCreateBusiness = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders BusinessNewForm component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <BusinessNewForm createBusiness={mockCreateBusiness} />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/contact information/i)).toBeInTheDocument();
});

test("shows validation errors on empty submission", async () => {
  render(
    <MemoryRouter>
      <AllProviders>
        <BusinessNewForm createBusiness={mockCreateBusiness} />
      </AllProviders>
    </MemoryRouter>
  );

  fireEvent.submit(screen.getByRole("button", { name: /add business/i }));

  await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });
});

test("calls createBusiness function on valid submission", async () => {
  render(
    <MemoryRouter>
      <AllProviders>
        <BusinessNewForm createBusiness={mockCreateBusiness} />
      </AllProviders>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "My New Business" },
  });
  fireEvent.change(screen.getByLabelText(/contact information/i), {
    target: { value: "contact@example.com" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /add business/i }));

  await waitFor(() => {
    expect(mockCreateBusiness).toHaveBeenCalledWith({
      name: "My New Business",
      contactInfo: "contact@example.com",
    });
  });
});

test("shows error message on business creation failure", async () => {
  mockCreateBusiness.mockResolvedValueOnce({
    success: false,
    errors: ["Failed to create business. Please try again."],
  });

  render(
    <MemoryRouter>
      <AllProviders>
        <BusinessNewForm createBusiness={mockCreateBusiness} />
      </AllProviders>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "My New Business" },
  });
  fireEvent.change(screen.getByLabelText(/contact information/i), {
    target: { value: "contact@example.com" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /add business/i }));

  await waitFor(() => {
    expect(
      screen.getByText(/failed to create business. please try again./i)
    ).toBeInTheDocument();
  });
});
