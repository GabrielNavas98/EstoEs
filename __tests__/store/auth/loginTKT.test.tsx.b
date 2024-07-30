import { describe, expect } from '@jest/globals';
import { logIn } from "@/store/reducers/authSlice";
import { store } from '@/store/store';
import fetchMock from "jest-fetch-mock";
import { ErrorCodes } from '@/errors/apiErrors';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});
describe('Login function', () => {

    const testCases = [
        {
            description: 'Email field empty',
            email: '',
            password: 'any',
            errorMessage: 'Debes ingresar un email',
        },
        {
            description: 'The password must be correct',
            email: 'NotAnAdmin',
            password: 'wrongPassword',
            errorMessage: 'La contraseña es incorrecta',
        }
        // {
        //     description: 'Successful login',
        //     emailValue: 'NotAnAdmin',
        //     passwordValue: '@Dm1N',
        //     successMessage: 'Logged in successfully',
        // },
    ];

    testCases.forEach(testCase => {

        it(testCase.description, async () => {
            fetchMock.mockResponseOnce(JSON.stringify(
                {
                    user: {
                        name: "juan",
                        email: "string | null;",
                        image: "string | null;",
                        admin: true
                    }
                }
            ));
            await store.dispatch(logIn({ email: testCase.email, password: testCase.password }));
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });
    });

    it("login thunk calls fetch with email and password", async () => {
        fetchMock.mockResponseOnce(JSON.stringify(
            {
                user: {
                    name: "juan",
                    email: "string | null;",
                    image: "string | null;",
                    admin: true
                }
            }
        ));
        await store.dispatch(logIn({ email: "testCase.email", password: "testCase.password" }));

        expect(fetchMock).toHaveBeenCalledWith(
            "http://localhost:3000/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: "testCase.email", password: "testCase.password" })
            });
    })


    it("login thunk calls and fail", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            errorMessage: "message",
            errorCode: 101
        }), { status: 400 });

        const response = await store.dispatch(logIn({ email: "testCase.email", password: "testCase.password" }));

        expect(response.type).toBe('auth/logIn/rejected');

        expect(response.payload).toEqual({
            errorMessage: "message",
            errorCode: 101,
        });
    })


    // todo: it ("mockear respuesta de error")
    it("login thunk calls and fail with unimplemented error", async () => {
        fetchMock.mockRejectOnce(new Error("Generic error"));

        const response = await store.dispatch(logIn({ email: "testCase.email", password: "testCase.password" }));

        expect(response.payload).toEqual({
            errorMessage: 'Unhandled error occurred',
            errorCode: ErrorCodes.UNIMPLEMENTED,
        });
    });


})
