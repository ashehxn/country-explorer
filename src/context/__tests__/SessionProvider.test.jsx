// src/context/__tests__/SessionProvider.test.jsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { SessionProvider, useSession } from '../SessionProvider';

// Mock axios
jest.mock('axios');

// Create a test component that uses the session context
const TestComponent = () => {
    const { user, login, logout } = useSession();

    return (
        <div>
            {user ? (
                <>
                    <div>Logged in as: {user.username}</div>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <button onClick={() => login('testuser', 'password123')}>Login</button>
            )}
        </div>
    );
};

describe('SessionProvider', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
        axios.get.mockImplementation((url) => {
            if (url.includes('check-session')) {
                return Promise.resolve({ data: { user: null } });
            }
            if (url.includes('logout')) {
                return Promise.resolve({});
            }
            return Promise.reject(new Error('Unknown URL'));
        });
        axios.post.mockResolvedValue({
            data: { user: { id: '1', username: 'testuser' } },
        });
    });

    test('provides login and logout functionality', async () => {
        // Render with act to handle initial useEffect
        await act(async () => {
            render(
                <SessionProvider>
                    <TestComponent />
                </SessionProvider>
            );
        });

        expect(screen.queryByText(/Logged in as/)).not.toBeInTheDocument();

        // Login
        await act(async () => {
            await userEvent.click(screen.getByText('Login'));
        });

        expect(screen.getByText('Logged in as: testuser')).toBeInTheDocument();

        // Logout
        await act(async () => {
            await userEvent.click(screen.getByText('Logout'));
        });

        expect(screen.queryByText(/Logged in as/)).not.toBeInTheDocument();
    });

    test('persists user session', async () => {
        // Render with act
        await act(async () => {
            render(
                <SessionProvider>
                    <TestComponent />
                </SessionProvider>
            );
        });

        // Login
        await act(async () => {
            await userEvent.click(screen.getByText('Login'));
        });

        expect(screen.getByText('Logged in as: testuser')).toBeInTheDocument();
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:5000/api/auth/login',
            { username: 'testuser', password: 'password123' },
            { withCredentials: true }
        );
    });
});