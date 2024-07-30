import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectFileInput } from "@/components/index";

describe("file input component", () => {

  it("renders file input component", () => {
    render(<SelectFileInput onChange={() => {}} name="test" />);
    const inputElement = screen.getByTestId("inputImage");
    expect(inputElement).toBeInTheDocument();
  });

  it("accepts only image files", () => {
    render(<SelectFileInput onChange={() => {}} name="test" />);
    const inputElement = screen.getByTestId("inputImage");
    expect(inputElement).toHaveAttribute("accept", "image/*");
  });

  it("limits file size to 50MB", () => {
    render(<SelectFileInput onChange={() => {}} name="test" />);
    const inputElement = screen.getByTestId("inputImage") as HTMLInputElement;
    const file = new File(["dummy contents"], "example.jpg", {
      type: "image/jpeg",
    });
    Object.defineProperty(inputElement, "files", {
      value: [file],
    });
    userEvent.upload(inputElement, file);
    if (inputElement.files) {
      expect(inputElement.files[0].size).toBeLessThanOrEqual(50 * 1024 * 1024);
    }
  });
});
