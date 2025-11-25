/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle full name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import RegisterInput from "./RegisterInput";

expect.extend(matchers);

describe("RegisterInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle full name typing correctly", async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByLabelText("Full Name");

    // Action
    await userEvent.type(nameInput, "nametest");

    // Assert
    expect(nameInput).toHaveValue("nametest");
  });

  it("should handle username typing correctly", async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByLabelText("Email");

    // Action
    await userEvent.type(emailInput, "email@test.com");

    // Assert
    expect(emailInput).toHaveValue("email@test.com");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByLabelText("Password");

    // Action
    await userEvent.type(passwordInput, "passwordtest");

    // Assert
    expect(passwordInput).toHaveValue("passwordtest");
  });

  it("should call login function when login button is clicked", async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByLabelText("Full Name");
    await userEvent.type(nameInput, "nametest");
    const emailInput = await screen.getByLabelText("Email");
    await userEvent.type(emailInput, "email@test.com");
    const passwordInput = await screen.getByLabelText("Password");
    await userEvent.type(passwordInput, "passwordtest");
    const registerButton = await screen.getByRole("button", {
      name: "Register",
    });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: "nametest",
      email: "email@test.com",
      password: "passwordtest",
    });
  });
});
