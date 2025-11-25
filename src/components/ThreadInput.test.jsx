/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle body typing correctly
 *   - should handle category typing correctly
 *   - should call onAddThread function when save button is clicked
 */

import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import ThreadInput from "./ThreadInput";

expect.extend(matchers);

describe("ThreadInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle title typing correctly", async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />);
    const titleInput = await screen.getByLabelText("Judul");

    // Action
    await userEvent.type(titleInput, "judultest");

    // Assert
    expect(titleInput).toHaveValue("judultest");
  });

  it("should handle body typing correctly", async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />);
    const bodyInput = await screen.getByLabelText("Konten");

    // Action
    await userEvent.type(bodyInput, "kontentest");

    // Assert
    expect(bodyInput).toHaveValue("kontentest");
  });

  it("should handle category typing correctly", async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />);
    const categoryInput = await screen.getByLabelText("Kategori");

    // Action
    await userEvent.type(categoryInput, "kategoritest");

    // Assert
    expect(categoryInput).toHaveValue("kategoritest");
  });

  it("should call onAddThread function when save button is clicked", async () => {
    // Arrange
    const mockAddThread = vi.fn();
    render(<ThreadInput onAddThread={mockAddThread} />);
    const titleInput = await screen.getByLabelText("Judul");
    await userEvent.type(titleInput, "judultest");
    const bodyInput = await screen.getByLabelText("Konten");
    await userEvent.type(bodyInput, "kontentest");
    const categoryInput = await screen.getByLabelText("Kategori");
    await userEvent.type(categoryInput, "kategoritest");
    const saveButton = await screen.getByRole("button", { name: "Simpan" });

    // Action
    await userEvent.click(saveButton);

    // Assert
    expect(mockAddThread).toBeCalledWith({
      title: "judultest",
      body: "kontentest",
      category: "kategoritest",
    });
  });
});
