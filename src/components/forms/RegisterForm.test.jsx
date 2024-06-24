import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import RegisterForm from "./RegisterForm";
import { expect, test, vi } from "vitest";

// Mock register function
const mockRegister = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders RegisterForm component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <RegisterForm register={mockRegister} />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("shows validation errors on empty submission", async () => {
  render(
    <MemoryRouter>
      <AllProviders>
        <RegisterForm register={mockRegister} />
      </AllProviders>
    </MemoryRouter>
  );

  fireEvent.submit(screen.getByRole("button", { name: /register/i }));

  await waitFor(() => {
    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});

test("calls register function on valid submission", async () => {
  render(
    <MemoryRouter>
      <AllProviders>
        <RegisterForm register={mockRegister} />
      </AllProviders>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "johndoe" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /register/i }));

  await waitFor(() => {
    expect(mockRegister).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      password: "password123",
    });
  });
});

test("shows error message on registration failure", async () => {
  mockRegister.mockResolvedValueOnce({
    success: false,
    errors: ["Registration failed. Please try again."],
  });

  render(
    <MemoryRouter>
      <AllProviders>
        <RegisterForm register={mockRegister} />
      </AllProviders>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "johndoe" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /register/i }));

  await waitFor(() => {
    expect(
      screen.getByText(/registration failed. please try again./i)
    ).toBeInTheDocument();
  });
});
