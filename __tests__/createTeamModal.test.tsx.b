import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect } from '@jest/globals';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import fetchMock from "jest-fetch-mock";
import CreateTeamModal from '@/components/teams/CreateTeamModal';
import { act } from 'react-dom/test-utils';
import countries from '../utils/countries.json'

fetchMock.enableMocks();

describe('Create team Modal', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });
    const testCaseName = [
        {
            description: 'Name field empty',
            value: '',
            errorMessage: 'Debes ingresar el nombre del equipo',
        },
        {
            description: 'Must contain more than 3 characters',
            value: 'Ba',
            errorMessage: 'El nombre debe de contener más de 3 caracteres',
        },
        {
            description: 'Must contain less than 30 characters',
            value: 'Futbol club Futbol club Futbol club ',
            errorMessage: 'El nombre debe de contener menos de 30 caracteres',
        },
        {
            description: 'Only contain letters and spaces',
            value: 'Barcelona 1900',
            errorMessage: 'Solo puede contener letras y espacios',
        },
    ]

    testCaseName.forEach((testCaseName) => {
        it(testCaseName.description, async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify(
                    countries
                )
            );
            await act(async () => {
                render(
                    <Provider store={store}>
                        <CreateTeamModal />
                    </Provider>
                );
            })

            const createButton = screen.getByTestId('create-team-modal');
            fireEvent.click(createButton);

            const emailInput = screen.getByLabelText('Nombre');
            fireEvent.change(emailInput, { target: { value: testCaseName.value } });

            const submitCreate = screen.getByTestId('submit-team-modal');
            fireEvent.click(submitCreate);

            const errorMessage = screen.getByText(testCaseName.errorMessage);
            expect(errorMessage).toBeInTheDocument();

        });
    })




    const testCaseDescription = [
        {
            description: 'Description field empty',
            value: '',
            errorMessage: 'Debes ingresar la descripción del equipo',
        },
        {
            description: 'Must contain more than 10 characters',
            value: 'Equipo fu',
            errorMessage: 'La descripción debe de contener más de 10 caracteres',
        },
        {
            description: 'Must contain less than 500 characters',
            value: 'Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina Equipo fundado en el 1900, en el norte de Argentina',
            errorMessage: 'La descripción debe de contener menos de 500 caracteres',
        }
    ]

    testCaseDescription.forEach((testCaseDescription) => {
        it(testCaseDescription.description, async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify(
                    countries
                )
            );
            await act(async () => {
                render(
                    <Provider store={store}>
                        <CreateTeamModal />
                    </Provider>
                );
            })

            const createButton = screen.getByTestId('create-team-modal');
            fireEvent.click(createButton);

            const descriptionInput = screen.getByLabelText('Descripción');
            fireEvent.change(descriptionInput, { target: { value: testCaseDescription.value } });

            const submitCreate = screen.getByTestId('submit-team-modal');
            fireEvent.click(submitCreate);

            const errorMessage = screen.getByText(testCaseDescription.errorMessage);
            expect(errorMessage).toBeInTheDocument();

        });
    })




    const testCaseCode = [
        {
            description: 'Code field empty',
            value: '',
            errorMessage: 'Debes ingresar el codigo del equipo',
        },
        {
            description: 'Must contain more than 3 characters',
            value: '02',
            errorMessage: 'El codigo debe de contener más de 3 caracteres',
        },
        {
            description: 'Must contain less than 25 characters',
            value: '020202020202020202020202002',
            errorMessage: 'El codigo debe de contener menos de 25 caracteres',
        },
        {
            description: 'Only contain letters and numbers.',
            value: '02 02 0',
            errorMessage: 'Solo puede contener letras y numeros',
        },
    ]

    testCaseCode.forEach((testCaseCode) => {
        it(testCaseCode.description, async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify(
                    countries
                )
            );
            await act(async () => {
                render(
                    <Provider store={store}>
                        <CreateTeamModal />
                    </Provider>
                );
            })

            const createButton = screen.getByTestId('create-team-modal');
            fireEvent.click(createButton);

            const codeInput = screen.getByLabelText('Codigo del equipo');
            fireEvent.change(codeInput, { target: { value: testCaseCode.value } });

            const submitCreate = screen.getByTestId('submit-team-modal');
            fireEvent.click(submitCreate);

            const errorMessage = screen.getByText(testCaseCode.errorMessage);
            expect(errorMessage).toBeInTheDocument();

        });
    })




    const testCaseCountry = [
        {
            description: 'Country field empty',
            value: '',
            errorMessage: 'Debes ingresar el país del equipo',
        },
    ]

    testCaseCountry.forEach((testCaseCountry) => {
        it(testCaseCountry.description, async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify(
                    countries
                )
            );
            await act(async () => {
                render(
                    <Provider store={store}>
                        <CreateTeamModal />
                    </Provider>
                );
            })

            const createButton = screen.getByTestId('create-team-modal');
            fireEvent.click(createButton);

            const countryInput = screen.getByTestId('input-country');
            fireEvent.change(countryInput, { target: { value: testCaseCountry.value } });

            const submitCreate = screen.getByTestId('submit-team-modal');
            fireEvent.click(submitCreate);

            const errorMessage = screen.getByText(testCaseCountry.errorMessage);
            expect(errorMessage).toBeInTheDocument();

        });
    })




    const testCaseImage = [
        {
            description: 'Image field empty',
            value: '',
            errorMessage: 'Debes ingresar una imagen del equipo',
        },
    ]

    testCaseImage.forEach((testCaseImage) => {
        it(testCaseImage.description, async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify(
                    countries
                )
            );
            await act(async () => {
                render(
                    <Provider store={store}>
                        <CreateTeamModal />
                    </Provider>
                );
            })

            const createButton = screen.getByTestId('create-team-modal');
            fireEvent.click(createButton);

            const countryInput = screen.getByTestId('input-image');
            fireEvent.change(countryInput, { target: { value: testCaseImage.value } });

            const submitCreate = screen.getByTestId('submit-team-modal');
            fireEvent.click(submitCreate);

            const errorMessage = screen.getByText(testCaseImage.errorMessage);
            expect(errorMessage).toBeInTheDocument();

        });
    })


})