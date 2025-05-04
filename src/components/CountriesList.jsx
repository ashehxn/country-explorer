import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Container,
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
    Divider,
    CircularProgress,
    Pagination,
    IconButton,
    Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import {
    getAllCountries,
    searchCountriesByName,
    filterCountriesByRegion,
    filterCountriesByLanguage,
    filterCountriesByCurrency
} from '../services/api';
import BackgroundBubbles from './BackgroundBubbles';

const CountriesList = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    // State for countries data
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for search and filters
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('');
    const [language, setLanguage] = useState('');
    const [currency, setCurrency] = useState('');

    // State for pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 12;

    // Available filter options
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const languages = ['English', 'Spanish', 'French', 'Arabic', 'Chinese', 'Russian', 'Portuguese', 'German'];
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'AUD', 'CAD', 'LKR'];

    // Fetch all countries on component mount
    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true);
            try {
                const data = await getAllCountries();
                setCountries(data);
                setFilteredCountries(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    // Apply filters when search term or filters change
    useEffect(() => {
        const applyFilters = async () => {
            setLoading(true);
            try {
                let result = [];

                // Apply search and filters
                if (searchTerm) {
                    result = await searchCountriesByName(searchTerm);
                } else if (region) {
                    result = await filterCountriesByRegion(region.toLowerCase());
                } else if (language) {
                    result = await filterCountriesByLanguage(language.toLowerCase());
                } else if (currency) {
                    result = await filterCountriesByCurrency(currency.toLowerCase());
                } else {
                    result = countries;
                }

                setFilteredCountries(result);
                setTotalPages(Math.ceil(result.length / itemsPerPage));
                setPage(1); // Reset to first page when filters change
            } catch (error) {
                console.error('Error applying filters:', error);
                setFilteredCountries([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        if (countries.length > 0) {
            applyFilters();
        }
    }, [searchTerm, region, language, currency, countries]);

    // Handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setRegion('');
        setLanguage('');
        setCurrency('');
    };

    // Navigate to country detail page
    const handleCountryClick = (code) => {
        navigate(`/country/${code}`);
    };

    // Calculate current page items
    const currentPageItems = filteredCountries.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <Container sx={{ mt: 4, mb: 8 }}>
            <BackgroundBubbles />
            {/* Page Header */}
            <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
                Explore Countries
            </Typography>

            {/* Search and Filter Section */}
            <Box sx={{
                mb: 4,
                p: 3,
                borderRadius: 1,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                border: 1,
                borderColor: 'divider',
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)'
            }}>
                <Grid container spacing={2} alignItems="center">
                    {/* Search Input */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            placeholder="Search for a country..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setRegion('');
                                setLanguage('');
                                setCurrency('');
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: searchTerm && (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => setSearchTerm('')}>
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 1 }
                            }}
                        />
                    </Grid>

                    {/* Region Filter */}
                    <Grid item xs={12} sm={4} md={2}>
                        <FormControl fullWidth>
                            <Select
                                value={region}
                                onChange={(e) => {
                                    setRegion(e.target.value);
                                    setSearchTerm('');
                                    setLanguage('');
                                    setCurrency('');
                                }}
                                displayEmpty
                                sx={{ borderRadius: 1 }}
                            >
                                <MenuItem value="">
                                    <em>Region</em>
                                </MenuItem>
                                {regions.map((r) => (
                                    <MenuItem key={r} value={r}>{r}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Language Filter */}
                    <Grid item xs={12} sm={4} md={2}>
                        <FormControl fullWidth>
                            <Select
                                value={language}
                                onChange={(e) => {
                                    setLanguage(e.target.value);
                                    setSearchTerm('');
                                    setRegion('');
                                    setCurrency('');
                                }}
                                displayEmpty
                                sx={{ borderRadius: 1 }}
                            >
                                <MenuItem value="">
                                    <em>Language</em>
                                </MenuItem>
                                {languages.map((l) => (
                                    <MenuItem key={l} value={l}>{l}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Currency Filter */}
                    <Grid item xs={12} sm={4} md={2}>
                        <FormControl fullWidth>
                            <Select
                                value={currency}
                                onChange={(e) => {
                                    setCurrency(e.target.value);
                                    setSearchTerm('');
                                    setRegion('');
                                    setLanguage('');
                                }}
                                displayEmpty
                                sx={{ borderRadius: 1 }}
                            >
                                <MenuItem value="">
                                    <em>Currency</em>
                                </MenuItem>
                                {currencies.map((c) => (
                                    <MenuItem key={c} value={c}>{c}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Active Filters */}
                {(searchTerm || region || language || currency) && (
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                            Active filters:
                        </Typography>

                        {searchTerm && (
                            <Chip
                                label={`Search: ${searchTerm}`}
                                onDelete={() => setSearchTerm('')}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}

                        {region && (
                            <Chip
                                label={`Region: ${region}`}
                                onDelete={() => setRegion('')}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}

                        {language && (
                            <Chip
                                label={`Language: ${language}`}
                                onDelete={() => setLanguage('')}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}

                        {currency && (
                            <Chip
                                label={`Currency: ${currency}`}
                                onDelete={() => setCurrency('')}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}

                        <Chip
                            label="Clear all"
                            onClick={clearFilters}
                            size="small"
                            color="secondary"
                            variant="outlined"
                        />
                    </Box>
                )}
            </Box>

            {/* Results Count */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="body1" color="text.secondary">
                    {loading ? 'Searching...' :
                        filteredCountries.length === 0 ? 'No countries found' :
                            `Found ${filteredCountries.length} ${filteredCountries.length === 1 ? 'country' : 'countries'}`}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterListIcon fontSize="small" color="primary" />
                    <Typography variant="body2" color="text.secondary">
                        {searchTerm ? 'Search results' :
                            region ? `Region: ${region}` :
                                language ? `Language: ${language}` :
                                    currency ? `Currency: ${currency}` : 'All countries'}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Countries Grid */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                    <CircularProgress />
                </Box>
            ) : filteredCountries.length === 0 ? (
                <Box sx={{
                    textAlign: 'center',
                    py: 8,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : 'rgba(245, 245, 245, 0.7)',
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'divider'
                }}>
                    <Typography variant="h6" color="text.secondary">
                        No countries found matching your criteria
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Try adjusting your search or filters
                    </Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ width: '100%' }}>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {currentPageItems.map((country) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={country.name.common}
                                    sx={{
                                        display: 'flex',
                                        height: '100%',
                                        width: '30%'
                                    }}
                                >
                                    <Card
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 1,
                                            overflow: 'hidden',
                                            border: 1,
                                            borderColor: 'divider',
                                            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                            cursor: 'pointer',
                                            height: '100%',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                        onClick={() => {
                                            handleCountryClick(country.cca3)
                                        }}
                                    >
                                        <Box sx={{
                                            position: 'relative',
                                            height: 200,
                                            bgcolor: 'rgba(0,0,0,0.03)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden'
                                        }}>
                                            <Box
                                                component="img"
                                                src={country.flags.png}
                                                alt={`${country.name.common} flag`}
                                                sx={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'contain',
                                                    padding: 1
                                                }}
                                            />
                                        </Box>
                                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                                                {country.name.common}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                <strong>Region:</strong> {country.region}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Population:</strong> {country.population.toLocaleString()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default CountriesList;
