import "isomorphic-fetch";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Profile, UpdateButtonModal } from "@/components/index";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";

fetchMock.enableMocks();

const mockSession = {
  user: {
    id: "6beca7bb-ceb8-46d3-8f5e-ce238aa0e5e1",
    name: "John Doe",
    lastName: "Doe",
    email: "johndoe@example.com",
    image:
      "https://3bets-images.s3.amazonaws.com/50d0b6a0-99dd-4e03-be50-45d9278df40b_perfil.jpeg",
  },
};

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: mockSession,
    status: "authenticated",
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname: () => "/profile",
}));

describe("Profile", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("renders the profile component if user is authenticated", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        user: {
          birthdate: "1992-06-03T00:00:00.000Z",
        },
      })
    );
    await act(async () => {
      render(
        <Provider store={store}>
          <Profile />
        </Provider>
      );
    });

    expect(screen.getByTestId("profile")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
  });
});

describe("Update Profile Form", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("renders the UpdateUserModal component if user clicked", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        user: {
          birthdate: "1992-06-03T00:00:00.000Z",
        },
      })
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <Profile />
        </Provider>
      );
    });

    const OpenUpdateModalButton = screen.getByTestId(
      "OpenUpdateUserModal-button"
    );
    fireEvent.click(OpenUpdateModalButton); //abre el modal

    const updateUser = screen.getByTestId("updateUser-submit");
    const nameInput = screen.getByTestId("updateUser-name");

    expect(nameInput).toBeInTheDocument();
    expect(updateUser).toBeInTheDocument();
  });

  const testCasesName = [
    {
      description: "Name must contain more than 2 characters",
      value: "t",
      errorMessage: "El nombre debe de contener mas de 5 caracteres",
    },
    {
      description: "Name must contain less than 50 characters",
      value: "Estaesunacadenacon51caracteressinespacios12345611111",
      errorMessage: "El nombre debe de contener menos de 50 caracteres",
    },
    {
      description: "Name with numbers",
      value: " gabriel54 ",
      errorMessage: "Solo puede contener letras y espacios",
    },
  ];
  testCasesName.forEach((testCasesName) => {
    it(testCasesName.description, () => {
      render(<UpdateButtonModal color="primary" label="testing" />);

      const OpenUpdateModalButton = screen.getByTestId(
        "OpenUpdateUserModal-button"
      );
      fireEvent.click(OpenUpdateModalButton);

      const updateUser = screen.getByTestId("updateUser-submit");
      const nameInput = screen.getByLabelText("Nombre");

      fireEvent.change(nameInput, { target: { value: testCasesName.value } });
      fireEvent.click(updateUser);

      const errorMessage = screen.getByText(testCasesName.errorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  const testCasesLastName = [
    {
      description: "Lastname must contain more than 5 characters",
      value: "test",
      errorMessage: "El apellido debe de contener mas de 5 caracteres",
    },
    {
      description: "Lastname must contain less than 50 characters",
      value: "Estaesunacadenacon51caracteressinespacios12345611111",
      errorMessage: "El apellido debe de contener menos de 50 caracteres",
    },
    {
      description: "Lastname with numbers",
      value: " gabriel54 ",
      errorMessage: "Solo puede contener letras y espacios",
    },
  ];
  testCasesLastName.forEach((testCasesLastName) => {
    it(testCasesLastName.description, () => {
      render(<UpdateButtonModal color="primary" label="testing" />);

      const OpenUpdateModalButton = screen.getByTestId(
        "OpenUpdateUserModal-button"
      );
      fireEvent.click(OpenUpdateModalButton);

      const updateUser = screen.getByTestId("updateUser-submit");
      const apellidoInput = screen.getByLabelText("Apellido");

      fireEvent.change(apellidoInput, {
        target: { value: testCasesLastName.value },
      });
      fireEvent.click(updateUser);

      const errorMessage = screen.getByText(testCasesLastName.errorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  const testCasesBirthday = [
    {
      description: "Date of Birth must be between 1900 and today",
      value: "1899-01-01",
      errorMessage: "La fecha ingresada debe de ser entre 1900 y hoy",
    },
    {
      description: "Date of Birth must be 18 years ago or more",
      value: "2020-01-01",
      errorMessage: "Debes de ser mayor a 18 años",
    },
  ];

  testCasesBirthday.forEach((testCasesBirthday) => {
    it(testCasesBirthday.description, () => {
      render(<UpdateButtonModal color="primary" label="testing" />);

      const OpenUpdateModalButton = screen.getByTestId(
        "OpenUpdateUserModal-button"
      );
      fireEvent.click(OpenUpdateModalButton);

      const updateUser = screen.getByTestId("updateUser-submit");
      const dateOfBirthInput = screen.getByLabelText("Fecha de nacimiento");

      fireEvent.change(dateOfBirthInput, {
        target: { value: testCasesBirthday.value },
      });
      fireEvent.click(updateUser);

      const errorMessage = screen.getByText(testCasesBirthday.errorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

describe("Update Password", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  const testCasesPassword = [
    {
      description: "Password must contain more than 5 characters",
      value: "test",
      errorMessage: "La contraseña debe de contener mas de 5 caracteres",
    },
    {
      description: "Password must contain less than 50 characters",
      value: "Estaesunacadenacon51caracteressinespacios12345611111",
      errorMessage: "La contraseña debe de contener menos de 50 caracteres",
    },
    {
      description:
        "It must contain at least 1 capital letter, 1 number and 1 special character",
      value: "HOLA123",
      errorMessage:
        "Debe contener minimo 1 mayuscula, 1 número y 1 caracter especial",
    },
  ];
  testCasesPassword.forEach((testCasesPassword) => {
    it(testCasesPassword.description, async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          user: {
            birthdate: "1992-06-03T00:00:00.000Z",
          },
        })
      );
      fetchMock.mockResponseOnce("true");
      await act(async () => {
        render(
          <Provider store={store}>
            <Profile />
          </Provider>
        );
      });

      const OpenUpdatePasswordButton = screen.getByTestId(
        "OpenUpdatePassword-button"
      );
      fireEvent.click(OpenUpdatePasswordButton); //abre el modal
      const updateUser = screen.getByTestId("updatePassword-submit");

      const newPasswordInput = screen.getByLabelText("Nueva contraseña");

      fireEvent.change(newPasswordInput, {
        target: { value: testCasesPassword.value },
      });
      act(() => {
        updateUser.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      const errorMessage = screen.getByText(testCasesPassword.errorMessage);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
