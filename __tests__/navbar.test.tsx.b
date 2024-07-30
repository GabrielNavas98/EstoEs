import 'isomorphic-fetch';
import { render, screen } from '@testing-library/react'
import { describe, expect } from '@jest/globals';
import Navbar from '@/components/Navbar';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

// Mocking the session with the "admin" role
const mockSession = {
    jwt: {
        role: 'admin',
    },
};

// Mocking the useSession hook
jest.mock('next-auth/react', () => ({
    useSession: () => ({
        data: mockSession,
        status: 'authenticated',
    }),
}));

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    usePathname: () => '/',
}));

describe('Navbar', () => {
    it('Sidebar available for administrator', () => {
        render(
            <Provider store={store}>
                <Navbar />
            </Provider>
        );

        const sidebarElement = screen.getByTestId('side-bar');
        expect(sidebarElement).toBeInTheDocument();
    });
});