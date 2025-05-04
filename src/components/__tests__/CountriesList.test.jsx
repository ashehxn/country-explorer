// src/components/__tests__/CountriesList.test.jsx
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CountriesList from '../CountriesList';
import * as apiService from '../../services/api';

// Mock the API service
jest.mock('../../services/api');

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    BrowserRouter: jest.requireActual('react-router-dom').BrowserRouter,
    useNavigate: () => jest.fn(),
}));

// Mock MUI theme for useTheme
jest.mock('@mui/material/styles', () => ({
    ...jest.requireActual('@mui/material/styles'),
    useTheme: () => ({
        palette: { mode: 'light' },
    }),
}));

describe('CountriesList Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', async () => {
        apiService.getAllCountries.mockReturnValue(new Promise(() => { }));

        await act(async () => {
            render(
                <BrowserRouter>
                    <CountriesList />
                </BrowserRouter>
            );
        });

        expect(screen.getByText('Searching...')).toBeInTheDocument();
    });

    test('filters countries by search term', async () => {
        const mockCountries = [
            {
                name: { common: 'United States' },
                capital: ['Washington'],
                region: 'Americas',
                population: 331000000,
                flags: { png: 'us-flag.png' },
                cca3: 'USA',
            },
            {
                name: { common: 'United Kingdom' },
                capital: ['London'],
                region: 'Europe',
                population: 67000000,
                flags: { png: 'uk-flag.png' },
                cca3: 'GBR',
            },
        ];

        apiService.getAllCountries.mockResolvedValue(mockCountries);
        apiService.searchCountriesByName.mockResolvedValue([mockCountries[0]]);

        await act(async () => {
            render(
                <BrowserRouter>
                    <CountriesList />
                </BrowserRouter>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('United States')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Search for a country...');
        await act(async () => {
            await userEvent.type(searchInput, 'United States');
        });

        await waitFor(() => {
            expect(apiService.searchCountriesByName).toHaveBeenCalledWith('United States');
            expect(screen.getByText('United States')).toBeInTheDocument();
            expect(screen.queryByText('United Kingdom')).not.toBeInTheDocument();
        });
    });
});