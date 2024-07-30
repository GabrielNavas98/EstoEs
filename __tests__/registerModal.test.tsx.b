import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect } from '@jest/globals';
import RegisterButtonModal from '@/components/registerButtonModal';

describe('Register Modal', () => {
    const testCasesEmail = [
        {
            description: 'Email field empty',
            value: '',
            errorMessage: 'Debes ingresar un email',
        },
        {
            description: 'Email must contain more than 5 characters',
            value: 'test',
            errorMessage: 'Email debe de contener mas de 5 caracteres',
        },
        {
            description: 'Email must contain less than 50 characters',
            value: 'Estaesunacadenacon51caracteressinespacios12345611111',
            errorMessage: 'Email debe de contener menos de 50 caracteres',
        },
        {
            description: 'Email must have correct format',
            value: 'gabriel.com',
            errorMessage: 'Ingrese un email valido',
        },
    ];
    testCasesEmail.forEach((testCasesEmail) => {
        it(testCasesEmail.description, () => {
            render(<RegisterButtonModal/>);

            const registerButton = screen.getByTestId('boton-registro-modal');
            fireEvent.click(registerButton);

            const registerModalButton = screen.getByText('Register');
            const emailInput = screen.getByLabelText('Email');

            fireEvent.change(emailInput, { target: { value: testCasesEmail.value } });
            fireEvent.click(registerModalButton);

            const errorMessage = screen.getByText(testCasesEmail.errorMessage);
            expect(errorMessage).toBeInTheDocument();
        });
    });


    const testCasesName = [
        {
            description: 'Name field empty',
            value: '',
            errorMessage: 'Debes ingresar tu nombre',
        },
        {
            description: 'Name must contain more than 2 characters',
            value: 't',
            errorMessage: 'El nombre debe de contener mas de 5 caracteres',
        },
        {
            description: 'Name must contain less than 50 characters',
            value: 'Estaesunacadenacon51caracteressinespacios12345611111',
            errorMessage: 'El nombre debe de contener menos de 50 caracteres',
        },
        {
            description: 'Name with numbers',
            value: ' gabriel54 ',
            errorMessage: 'Solo puede contener letras y espacios',
        },
    ];
    testCasesName.forEach((testCasesName) => {
        it(testCasesName.description, () => {
            render(<RegisterButtonModal />);

            const registerButton = screen.getByTestId('boton-registro-modal');
            fireEvent.click(registerButton);

            const registerModalButton = screen.getByText('Register');
            const nameInput = screen.getByLabelText('Nombre');
            const apellidoInput = screen.getByLabelText('Apellido');

            fireEvent.change(nameInput, { target: { value: testCasesName.value } });
            fireEvent.change(apellidoInput, { target: { value: 'Perez' } });
            fireEvent.click(registerModalButton);

            const errorMessage = screen.getByText(testCasesName.errorMessage);
            expect(errorMessage).toBeInTheDocument();
        });
    });

    const testCasesLastName = [
        {
            description: 'Lastname field empty',
            value: '',
            errorMessage: 'Debes ingresar tu apellido',
        },
        {
            description: 'Lastname must contain more than 5 characters',
            value: 'test',
            errorMessage: 'El apellido debe de contener mas de 5 caracteres',
        },
        {
            description: 'Lastname must contain less than 50 characters',
            value: 'Estaesunacadenacon51caracteressinespacios12345611111',
            errorMessage: 'El apellido debe de contener menos de 50 caracteres',
        },
        {
            description: 'Lastname with numbers',
            value: ' gabriel54 ',
            errorMessage: 'Solo puede contener letras y espacios',
        },
    ];
    testCasesLastName.forEach((testCasesLastName) => {
        it(testCasesLastName.description, () => {
            render(<RegisterButtonModal />);

            const registerButton = screen.getByTestId('boton-registro-modal');
            fireEvent.click(registerButton);

            const registerModalButton = screen.getByText('Register');
            const nameInput = screen.getByLabelText('Nombre');
            const apellidoInput = screen.getByLabelText('Apellido');

            fireEvent.change(nameInput, { target: { value: "Juan" } });
            fireEvent.change(apellidoInput, { target: { value: testCasesLastName.value } });
            fireEvent.click(registerModalButton);

            const errorMessage = screen.getByText(testCasesLastName.errorMessage);
            expect(errorMessage).toBeInTheDocument();
        });
    });

    const testCasesBirthday = [
        {
            description: 'Date of Birth field empty',
            value: '',
            errorMessage: 'Debes ingresar tu fecha de nacimiento',
        },
        {
            description: 'Date of Birth must be between 1900 and today',
            value: '1899-01-01',
            errorMessage: 'La fecha ingresada debe de ser entre 1900 y hoy',
        },
        {
            description: 'Date of Birth must be 18 years ago or more',
            value: '2020-01-01',
            errorMessage: 'Debes de ser mayor a 18 años',
        }
    ];

    testCasesBirthday.forEach((testCasesBirthday) => {
        it(testCasesBirthday.description, () => {
            render(<RegisterButtonModal />);

            const registerButton = screen.getByTestId('boton-registro-modal');
            fireEvent.click(registerButton);

            const registerModalButton = screen.getByText('Register');
            const dateOfBirthInput = screen.getByLabelText('Fecha de nacimiento');

            fireEvent.change(dateOfBirthInput, { target: { value: testCasesBirthday.value } });
            fireEvent.click(registerModalButton);

            const errorMessage = screen.getByText(testCasesBirthday.errorMessage);
            expect(errorMessage).toBeInTheDocument();
        });
    });
    const testCasesPassword = [
        {
            description: 'Password field empty',
            value: '',
            errorMessage: 'Debes ingresar una contraseña',
        },
        {
            description: 'Password must contain more than 5 characters',
            value: 'test',
            errorMessage: 'La contraseña debe de contener mas de 5 caracteres',
        },
        {
            description: 'Password must contain less than 50 characters',
            value: 'Estaesunacadenacon51caracteressinespacios12345611111',
            errorMessage: 'La contraseña debe de contener menos de 50 caracteres',
        },
        {
            description: 'It must contain at least 1 capital letter, 1 number and 1 special character',
            value: 'HOLA123',
            errorMessage: 'Debe contener minimo 1 mayuscula, 1 número y 1 caracter especial',
        },
    ];
    testCasesPassword.forEach((testCasesPassword) => {
        it(testCasesPassword.description, () => {
            render(<RegisterButtonModal />);

            const registerButton = screen.getByTestId('boton-registro-modal');
            fireEvent.click(registerButton);

            const registerModalButton = screen.getByText('Register');
            const passwordInput = screen.getByLabelText('Contraseña');

            fireEvent.change(passwordInput, { target: { value: testCasesPassword.value } });
            fireEvent.click(registerModalButton);

            const errorMessage = screen.getByText(testCasesPassword.errorMessage);
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('should display error message when one input is empty', () => {
        render(<RegisterButtonModal />);
        const registerButton = screen.getByTestId('boton-registro-modal');
        fireEvent.click(registerButton);
        const registerModalButton = screen.getByText('Register');

        const emailInput = screen.getByLabelText('Email');
        const nameInput = screen.getByLabelText('Nombre');
        const apellidoInput = screen.getByLabelText('Apellido');
        const passwordInput = screen.getByLabelText('Contraseña');

        fireEvent.change(emailInput, { target: { value: 'Carlos1@gmail.com' } });
        fireEvent.change(nameInput, { target: { value: 'Carlos' } });
        fireEvent.change(apellidoInput, { target: { value: 'Perez' } });
        fireEvent.change(passwordInput, { target: { value: 'Carlos1@' } });

        fireEvent.change(passwordInput, { target: { value: '' } });

        fireEvent.click(registerModalButton)
        const errorMessage = screen.getByText(testCasesPassword[0].errorMessage);
        expect(errorMessage).toBeInTheDocument();
    })

    it('Should not show an error when all fields are valid', () => {
        render(<RegisterButtonModal />);
        const registerButton = screen.getByTestId('boton-registro-modal');
        fireEvent.click(registerButton);
        const registerModalButton = screen.getByText('Register');

        const emailInput = screen.getByLabelText('Email');
        const nameInput = screen.getByLabelText('Nombre');
        const apellidoInput = screen.getByLabelText('Apellido');
        const passwordInput = screen.getByLabelText('Contraseña');

        fireEvent.change(emailInput, { target: { value: 'Carlos1@gmail.com' } });
        fireEvent.change(nameInput, { target: { value: 'Carlos' } });
        fireEvent.change(apellidoInput, { target: { value: 'Perez' } });
        fireEvent.change(passwordInput, { target: { value: 'Carlos1@' } });

        fireEvent.click(registerModalButton)
        const errorMessages = screen.queryAllByTestId('error_name');
        expect(errorMessages).toHaveLength(0);

        const emailErrorMessages = screen.queryAllByTestId('error_email');
        expect(emailErrorMessages).toHaveLength(0);

        const lastNameErrorMessages = screen.queryAllByTestId('error_lastname');
        expect(lastNameErrorMessages).toHaveLength(0);

        const passwordErrorMessages = screen.queryAllByTestId('error_password');
        expect(passwordErrorMessages).toHaveLength(0);
    })
})