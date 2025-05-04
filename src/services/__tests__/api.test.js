// src/services/__tests__/api.test.js
import { getAllCountries, searchCountriesByName, filterCountriesByRegion } from '../api';

// Mock fetch
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.error to suppress logs
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    console.error.mockRestore();
  });

  test('getAllCountries fetches data correctly', async () => {
    const mockData = [{ name: { common: 'Test Country' } }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getAllCountries();

    expect(fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,languages,cca3'
    );
    expect(result).toEqual(mockData);
  });

  test('searchCountriesByName fetches data with correct parameters', async () => {
    const mockData = [{ name: { common: 'United States' } }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await searchCountriesByName('United');

    expect(fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/name/United?fields=name,capital,region,population,flags,languages,cca3'
    );
    expect(result).toEqual(mockData);
  });

  test('handles API errors gracefully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await getAllCountries();

    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(expect.any(Error));
  });
});