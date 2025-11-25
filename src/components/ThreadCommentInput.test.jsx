/**
 * skenario testing
 *
 * - ThreadCommentInput component
 *   - should handle comment typing correctly
 *   - should call onAddThreadComment function when send button is clicked
 */

import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import ThreadCommentInput from "./ThreadCommentInput";

expect.extend(matchers);

describe("ThreadCommentInput component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle comment typing correctly", async () => {
    // Arrange
    render(<ThreadCommentInput onAddThreadComment={() => {}} />);
    const commentInput = await screen.getByPlaceholderText(
      "Berikan komentar disini..."
    );

    // Action
    await userEvent.type(commentInput, "komentartest");

    // Assert
    expect(commentInput).toHaveValue("komentartest");
  });

  it("should call onAddThreadComment function when send button is clicked", async () => {
    // Arrange
    const mockAddComment = vi.fn();
    render(<ThreadCommentInput onAddThreadComment={mockAddComment} />);
    const commentInput = await screen.getByPlaceholderText(
      "Berikan komentar disini..."
    );
    await userEvent.type(commentInput, "komentartest");
    const sendButton = await screen.getByRole("button", { name: "Kirim" });

    // Action
    await userEvent.click(sendButton);

    // Assert
    expect(mockAddComment).toBeCalledWith("komentartest");
  });
});
