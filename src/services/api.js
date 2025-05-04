const BASE_URL = "https://restcountries.com/v3.1";

// Fetch all countries with filtered fields for optimization
export const getAllCountries = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/all?fields=name,capital,region,population,flags,languages,cca3`
    );
    if (!response.ok) throw new Error("Failed to fetch countries");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Search countries by name
export const searchCountriesByName = async (name) => {
  if (!name) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/name/${name}?fields=name,capital,region,population,flags,languages,cca3`
    );
    if (!response.ok) throw new Error("No countries found");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Filter countries by region
export const filterCountriesByRegion = async (region) => {
  if (!region) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/region/${region}?fields=name,capital,region,population,flags,languages,cca3`
    );
    if (!response.ok) throw new Error("No countries found in this region");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Filter countries by language
export const filterCountriesByLanguage = async (language) => {
  if (!language) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/lang/${language}?fields=name,capital,region,population,flags,languages,cca3`
    );
    if (!response.ok) throw new Error("No countries found with this language");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Filter countries by currency
export const filterCountriesByCurrency = async (currency) => {
  if (!currency) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/currency/${currency}?fields=name,capital,region,population,flags,languages,cca3`
    );
    if (!response.ok) throw new Error("No countries found with this currency");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get detailed information for a specific country by code
export const getCountryDetails = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) throw new Error("Country not found");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
