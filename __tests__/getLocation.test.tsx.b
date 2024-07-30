import { render, screen } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import GetLocation from "@/utils/GetLocation";

describe("GetLocation Component", () => {
  beforeAll(() => {
    Object.defineProperty(global.navigator, "permissions", {
      writable: true,
      value: {
        query: jest
          .fn()
          .mockImplementation(() => Promise.resolve({ state: "granted" })),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar todos los mocks después de cada prueba
  });

  it("User has granted location permission and is in San Juan", () => {
    Object.defineProperty(global.navigator, "geolocation", {
      writable: true,
      value: {
        getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
          success({
            coords: {
              latitude: -30.764517026074433,
              longitude: -68.8844465226512,
            },
          })
        ),
      },
    });

    render(<GetLocation />);

    const modalOk = screen.getByText("Bien");
    expect(modalOk).toBeInTheDocument();
  });

  it("User has granted location permission and isn´t in San Juan", () => {
    Object.defineProperty(global.navigator, "geolocation", {
      writable: true,
      value: {
        getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
          success({
            coords: {
              latitude: -34.596273784852016,
              longitude: -58.45202688648878,
            },
          })
        ),
      },
    });

    render(<GetLocation />);

    const modalOk = screen.getByText("Ubicación no válida");
    expect(modalOk).toBeInTheDocument();
  });

  it("The user did not give permissions", () => {
    render(<GetLocation />);
    const modalOk = screen.getByText("Ubicación restringida");
    expect(modalOk).toBeInTheDocument();
  });
});
