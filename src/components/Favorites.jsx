// src/components/Favorites.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Container,
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    Button,
    Divider,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../context/FavoritesContext';
import BackgroundBubbles from './BackgroundBubbles';

const Favorites = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { favorites, removeFavorite } = useFavorites();

    const handleCountryClick = (code) => {
        navigate(`/country/${code}`);
    };

    return (
        <Container sx={{ mt: 4, mb: 8 }}>
            <BackgroundBubbles />

            {/* Page Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                    My Favorite Countries
                </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Favorites List */}
            {favorites.length === 0 ? (
                <Box sx={{
                    textAlign: 'center',
                    py: 8,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : 'rgba(245, 245, 245, 0.7)',
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'divider'
                }}>
                    <Typography variant="h6" color="text.secondary">
                        You haven't added any countries to your favorites yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                        Explore countries and click the "Add to Favorites" button to save them here
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/countries')}
                        sx={{
                            borderRadius: 1,
                            textTransform: 'none',
                            px: 3,
                            py: 1
                        }}
                    >
                        Explore Countries
                    </Button>
                </Box>
            ) : (
                <Box sx={{ width: '100%' }}>
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        {favorites.map((country) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={country.name.common}
                                sx={{
                                    display: 'flex',
                                    height: '100%'
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
                                        position: 'relative',
                                        height: '100%',
                                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFavorite(country.name.common);
                                        }}
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            zIndex: 10,
                                            bgcolor: 'rgba(0,0,0,0.2)',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'rgba(0,0,0,0.4)'
                                            }
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    <Box
                                        onClick={() => handleCountryClick(country.cca3)}
                                        sx={{
                                            cursor: 'pointer',
                                            position: 'relative',
                                            height: 200,
                                            bgcolor: 'rgba(0,0,0,0.03)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden'
                                        }}
                                    >
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

                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            p: 2,
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleCountryClick(country.cca3)}
                                    >
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
            )}
        </Container>
    );
};

export default Favorites;
