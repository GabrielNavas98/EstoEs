import ModifyTeam from "@/app/@modal/(.)team/[id]/page"
import { render, screen } from '@testing-library/react';
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";
import countries from '../utils/countries.json'
import 'jest-canvas-mock';
import 'react-avatar-editor';


fetchMock.enableMocks();

HTMLCanvasElement.prototype.getContext = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    usePathname: () => "",
}));

jest.mock('react-avatar-editor', () => {
    return {
        __esModule: true,
        default: jest.fn(props => {
            return (
                <div data-testid="mocked-avatar-editor">
                </div>
            );
        }),
    };
});

describe('Put team Modal', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('get equipment correctly', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(countries));
        fetchMock.mockResponseOnce(JSON.stringify({
            name: "Bolivia fc",
            description: "Pais de bolivia",
            code: "000",
            country: "Bolivia",
            image: "https://3bets-images.s3.amazonaws.com/0a24303f-178d-4c47-a645-aaa16d8850a2_Captura de pantalla (57).png",
            teamID: "3f571f31-0beb-4b6d-87e9-2d9058a89ac5"
        }));
        await act(async () => {
            render(
                <ModifyTeam />
            );
        });

        const NameIput = screen.getByLabelText('Nombre');
        if (NameIput instanceof HTMLInputElement) {
            expect(NameIput.value).toBe("Bolivia fc");
        } else {
            throw new Error("El elemento no es un input");
        }

        const DescriptionInput = screen.getByLabelText('Descripción');
        if (DescriptionInput instanceof HTMLTextAreaElement) {
            expect(DescriptionInput.value).toBe("Pais de bolivia");
        } else {
            throw new Error("El elemento no es un textarea.");
        }

        const CodeInput = screen.getByLabelText('Codigo del equipo');

        if (CodeInput instanceof HTMLInputElement) {
            expect(CodeInput.value).toBe("000");
        } else {
            throw new Error("El elemento no es un input");
        }

    })

    it('should handle an error response when fetching team', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(countries));
        fetchMock.mockReject(new Error("Failed to fetch"));

        await act(async () => {
            render(<ModifyTeam />);
        });

        await screen.findByText('Error al obtener el equipo!');

        expect(screen.getByText('Error al obtener el equipo!')).toBeInTheDocument();
    });
})