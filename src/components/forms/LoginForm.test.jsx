import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AllProviders } from "../../testUtils";
import LoginForm from "./LoginForm";
import { expect, test, vi } from "vitest";

// Mock login function
const mockLogin = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

test("renders LoginForm component", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AllProviders>
        <LoginForm login={mockLogin} />
      </AllProviders>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test("shows validation errors on empty submission", async () => {
  render(
    <MemoryRouter>
      <AllProviders>
        <LoginForm login={mockLogin} />
      </AllProviders>
    </MemoryRouter>
  );

  fireEvent.submit(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});

test("calls login function on valid submission", async () => {
  render(
    <MemoryRouter>
      <AllProviders>
        <LoginForm login={mockLogin} />
      </AllProviders>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "johndoe" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith({
      username: "johndoe",
      password: "password123",
    });
  });
});

test("shows error message on login failure", async () => {
  mockLogin.mockResolvedValueOnce({
    success: false,
  });

  render(
    <MemoryRouter>
      <AllProviders>
        <LoginForm login={mockLogin} />
      </AllProviders>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "johndoe" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.submit(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(
      screen.getByText(
        /login failed. please check your username and password./i
      )
    ).toBeInTheDocument();
  });
});
