import 'isomorphic-fetch';
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect } from '@jest/globals';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

import LoginButtonModal from '@/components/loginButtonModal';

// const mockStore = configureStore({
//     reducer: authReducer
// });
// mockStore.dispatch = jest.fn();

jest.mock('next-auth/react', () => ({
    useSession: jest.fn().mockReturnValue([{ data: null }, false])
}));

jest.mock('../store/reducers/authSlice', () => {
    const originalModule = jest.requireActual('../store/reducers/authSlice');
    return {
        ...originalModule,
        logIn: jest.fn(() => Promise.resolve('someValue')),
    };
});


describe('Login Modal', () => {
    const testCaseEmail = [
        {
            description: 'Email field empty',
            value: '',
            errorMessage: 'Debes ingresar un email',
        },
        {
            description: 'Email must have correct format',
            value: 'ele@',
            errorMessage: 'Ingrese un email valido',
        },
    ];

    testCaseEmail.forEach((testCaseEmail) => {
        it(testCaseEmail.description, () => {
            render(
                <Provider store={store}>
                    <LoginButtonModal />
                </Provider>
            );

            const loginButton = screen.getByTestId('boton-login-modal');
            fireEvent.click(loginButton);

            const emailInput = screen.getByLabelText('Email');
            fireEvent.change(emailInput, { target: { value: testCaseEmail.value } });

            const loginSesion = screen.getByTestId('boton-login-sesion');
            fireEvent.click(loginSesion);

            const errorMessage = screen.getByText(testCaseEmail.errorMessage);
            expect(errorMessage).toBeInTheDocument();

        });
    })

    const testCasePassword = [
        {
            description: 'Password field empty',
            value: '',
            errorMessage: 'Debes ingresar una contraseña',
        },
    ];

    testCasePassword.forEach((testCasePassword) => {
        it(testCasePassword.description, () => {
            render(
                <Provider store={store}>
                    <LoginButtonModal />
                </Provider>
            );

            const loginButton = screen.getByTestId('boton-login-modal');
            fireEvent.click(loginButton);

            const passwordInput = screen.getByLabelText('Contraseña');
            fireEvent.change(passwordInput, { target: { value: testCasePassword.value } });

            const loginSesion = screen.getByTestId('boton-login-sesion');
            fireEvent.click(loginSesion);

            const errorMessage = screen.getByText(testCasePassword.errorMessage);
            expect(errorMessage).toBeInTheDocument();

        });
    })

});
