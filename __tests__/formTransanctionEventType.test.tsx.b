import "isomorphic-fetch";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import FromFinancialTransactionType from "@/components/FormFinancialTransactionType";

describe("Form Transaction Event Type Modal", () => {
  const testCasesName = [
    {
      description: "Name must contain more than 5 characters",
      value: "t",
      errorMessage: "El nombre debe de contener mas de 5 caracteres",
    },
    {
      description: "Name must contain less than 50 characters",
      value: "Estaesunacadenacon51caracteressinespacios12345611111",
      errorMessage: "El nombre debe de contener menos de 50 caracteres",
    },
    {
      description: "Name with spaces",
      value: " transaction in progress ",
      errorMessage:
        "Solo puede contener guiones bajos (_), cambia espacios por un _",
    },
  ];
  testCasesName.forEach((testCasesName) => {
    it(testCasesName.description, () => {
      render(<FromFinancialTransactionType />);

      const openButton = screen.getByTestId("boton-open-modal");
      fireEvent.click(openButton);

      const SubmitButton = screen.getByTestId("submit-button");
      const nameInput = screen.getByLabelText("Nombre");
      const descriptionInput = screen.getByLabelText("Descripción");

      fireEvent.change(nameInput, { target: { value: testCasesName.value } });
      fireEvent.change(descriptionInput, {
        target: { value: "este evento es para los test" },
      });
      fireEvent.click(SubmitButton);

      const errorMessage = screen.getByText(testCasesName.errorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  const testCasesDescription = [
    {
      description: "Description must contain less than 500 characters",
      value:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      errorMessage: "La descripción debe de contener menos de 500 caracteres",
    },
  ];
  testCasesDescription.forEach((testCasesDescription) => {
    it(testCasesDescription.description, () => {
      render(<FromFinancialTransactionType />);

      const openButton = screen.getByTestId("boton-open-modal");
      fireEvent.click(openButton);

      const SubmitButton = screen.getByTestId("submit-button");
      const nameInput = screen.getByLabelText("Nombre");
      const descriptionInput = screen.getByLabelText("Descripción");

      fireEvent.change(nameInput, {
        target: { value: "testing_typeEvent" },
      });
      fireEvent.change(descriptionInput, {
        target: { value: testCasesDescription.value },
      });
      fireEvent.click(SubmitButton);

      const errorMessage = screen.getByText(testCasesDescription.errorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("Should not show an error when all fields are valid", () => {
    render(<FromFinancialTransactionType />);
    const openButton = screen.getByTestId("boton-open-modal");
    fireEvent.click(openButton);

    const nameInput = screen.getByLabelText("Nombre");
    const descriptionInput = screen.getByLabelText("Descripción");

    fireEvent.change(nameInput, { target: { value: "testing_typeEvent" } });
    fireEvent.change(descriptionInput, {
      target: { value: "este evento es para los test" },
    });
    const nameErrorMessages = screen.queryAllByTestId("error_name");
    expect(nameErrorMessages).toHaveLength(0);

    const descriptionErrorMessages =
      screen.queryAllByTestId("error_description");
    expect(descriptionErrorMessages).toHaveLength(0);
  });
});
