import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    Button,
    Divider,
    Chip,
    CircularProgress,
    Card,
    CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useFavorites } from '../context/FavoritesContext';
import { getCountryDetails } from '../services/api';
import BackgroundBubbles from './BackgroundBubbles';

const CountryDetail = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            setLoading(true);
            try {
                const data = await getCountryDetails(code);
                setCountry(Array.isArray(data) ? data[0] : data);
            } catch (err) {
                console.error('Error fetching country details:', err);
                setError('Failed to load country details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCountryDetails();
    }, [code]);

    const handleGoBack = () => {
        navigate('/countries');
    };

    useEffect(() => {
        if (country) {
            setFavorite(isFavorite(country.name.common));
        }
    }, [country, isFavorite]);

    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(country.name.common);
        } else {
            addFavorite(country);
        }
        setFavorite(!favorite);
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '70vh'
            }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4, mb: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: 1,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        border: 1,
                        borderColor: 'divider'
                    }}
                >
                    <Typography variant="h5" color="error" gutterBottom>
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleGoBack}
                        sx={{ mt: 2 }}
                    >
                        Back to Countries
                    </Button>
                </Paper>
            </Container>
        );
    }

    if (!country) {
        return (
            <Container sx={{ mt: 4, mb: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: 1,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        border: 1,
                        borderColor: 'divider'
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Country not found
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleGoBack}
                        sx={{ mt: 2 }}
                    >
                        Back to Countries
                    </Button>
                </Paper>
            </Container>
        );
    }

    // Extract data from country object
    const {
        name,
        flags,
        capital,
        region,
        subregion,
        population,
        languages,
        currencies,
        timezones,
        borders,
        area
    } = country;

    // Format languages as a string
    const languagesString = languages ? Object.values(languages).join(', ') : 'N/A';

    // Format currencies as a string
    const currenciesString = currencies
        ? Object.values(currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')
        : 'N/A';

    return (
        <Container sx={{ mt: 4, mb: 8 }}>
            <BackgroundBubbles />
            {/* Back button and actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                    sx={{
                        borderRadius: 1,
                        borderColor: 'divider',
                        color: 'text.primary',
                        textTransform: 'none'
                    }}
                >
                    Back to Countries
                </Button>

                <Button
                    variant={favorite ? "contained" : "outlined"}
                    color={favorite ? "primary" : "default"}
                    startIcon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    onClick={toggleFavorite}
                    sx={{
                        borderRadius: 1,
                        textTransform: 'none'
                    }}
                >
                    {favorite ? 'Saved to Favorites' : 'Add to Favorites'}
                </Button>
            </Box>

            {/* Country Header */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 1,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    border: 1,
                    borderColor: 'divider'
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                height: 250,
                                bgcolor: 'rgba(0,0,0,0.03)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                borderRadius: 1,
                                border: 1,
                                borderColor: 'divider'
                            }}
                        >
                            <Box
                                component="img"
                                src={flags?.png || flags?.svg}
                                alt={`${name?.common} flag`}
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    padding: 1
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                            {name?.common}
                        </Typography>

                        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                            {name?.official}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            <Chip
                                icon={<PublicIcon />}
                                label={region || 'N/A'}
                                variant="outlined"
                                color="primary"
                            />
                            {subregion && (
                                <Chip
                                    label={subregion}
                                    variant="outlined"
                                />
                            )}
                        </Box>

                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Capital:</strong> {capital?.[0] || 'N/A'}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Population:</strong> {population?.toLocaleString() || 'N/A'}
                        </Typography>

                        <Typography variant="body1">
                            <strong>Area:</strong> {area?.toLocaleString() || 'N/A'} km²
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Country Details */}
            <Grid container spacing={3}>
                {/* Languages */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        height: '100%',
                        borderRadius: 1,
                        border: 1,
                        borderColor: 'divider',
                        boxShadow: 'none'
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LanguageIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Languages</Typography>
                            </Box>
                            <Typography variant="body1">
                                {languagesString}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Currencies */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        height: '100%',
                        borderRadius: 1,
                        border: 1,
                        borderColor: 'divider',
                        boxShadow: 'none'
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <MonetizationOnIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Currencies</Typography>
                            </Box>
                            <Typography variant="body1">
                                {currenciesString}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Timezones */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        height: '100%',
                        borderRadius: 1,
                        border: 1,
                        borderColor: 'divider',
                        boxShadow: 'none'
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Timezones</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {timezones?.map((timezone, index) => (
                                    <Chip
                                        key={index}
                                        label={timezone}
                                        size="small"
                                        variant="outlined"
                                    />
                                )) || 'N/A'}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bordering Countries */}
                <Grid item xs={12} md={6}>
                    <Card sx={{
                        height: '100%',
                        borderRadius: 1,
                        border: 1,
                        borderColor: 'divider',
                        boxShadow: 'none'
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Bordering Countries</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {borders && borders.length > 0 ? (
                                    borders.map((border, index) => (
                                        <Chip
                                            key={index}
                                            label={border}
                                            size="small"
                                            variant="outlined"
                                            onClick={() => navigate(`/country/${border}`)}
                                            clickable
                                        />
                                    ))
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No bordering countries
                                    </Typography>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CountryDetail;
