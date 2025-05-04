import React, { useState, useEffect } from 'react';
import { useSession } from '../context/SessionProvider';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    Paper,
    Box,
    Card,
    CardContent,
    Button,
    Divider,
    CircularProgress,
    useMediaQuery
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareIcon from '@mui/icons-material/Compare';
import InfoIcon from '@mui/icons-material/Info';
import darkLogo from '../../src/assets/dark.png';
import lightLogo from '../../src/assets/light.png';
import { getAllCountries } from '../services/api';
import BackgroundBubbles from './BackgroundBubbles';

const Dashboard = () => {
    const { user } = useSession();
    const theme = useTheme();
    const logoSrc = theme.palette.mode === 'light' ? lightLogo : darkLogo;
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [stats, setStats] = useState({ total: 0, regions: 0 });
    const [featuredCountries, setFeaturedCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const countries = await getAllCountries();

                const regions = new Set(countries.map(country => country.region)).size;

                const randomCountries = [...countries]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);

                setStats({ total: countries.length, regions });
                setFeaturedCountries(randomCountries);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <BackgroundBubbles />
            <Box sx={{
                position: 'absolute',
                top: -20,
                right: 10,
                width: 150,
                height: 150,
                opacity: 0.1,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                animation: 'float1 8s ease-in-out infinite',
                '@keyframes float1': {
                    '0%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(-5px, 5px)' },
                    '100%': { transform: 'translate(0, 0)' }
                }
            }} />

            <Box sx={{
                position: 'absolute',
                bottom: -30,
                left: 10,
                width: 150,
                height: 150,
                opacity: 0.1,
                borderRadius: '50%',
                bgcolor: 'secondary.main',
                animation: 'float2 10s ease-in-out infinite',
                '@keyframes float2': {
                    '0%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(8px, -8px)' },
                    '100%': { transform: 'translate(0, 0)' }
                }
            }} />

            <Box sx={{
                position: 'absolute',
                top: 1220,
                right: 10,
                width: 120,
                height: 120,
                opacity: 0.1,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                animation: 'float1 8s ease-in-out infinite',
                '@keyframes float1': {
                    '0%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(-5px, 5px)' },
                    '100%': { transform: 'translate(0, 0)' }
                }
            }} />
            {/* Hero Section with Centered Logo and Floating Cards */}
            <Box sx={{
                position: 'relative',
                mb: 8,
                p: 4,
                pt: 8,
                pb: 8,
                borderRadius: 1,
                overflow: 'hidden',
                minHeight: '500px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Centered Logo and Title */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // centers children horizontally
                        justifyContent: 'center', // optional: centers vertically if parent allows
                        position: 'relative',
                        zIndex: 2,
                        mb: 4,
                        textAlign: 'center' // still useful for the Typography
                    }}
                >
                    <img
                        src={logoSrc}
                        alt="Country Explorer logo"
                        width="200"
                        height="200"
                        style={{ display: 'block' }}
                    />
                    <Typography variant="h3" component="h1" sx={{ mt: 2, fontWeight: 700 }}>
                        Country Explorer
                    </Typography>
                </Box>


                {/* Floating Cards */}
                <Box sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                    {/* Card 1 - Explore */}
                    <Card sx={{
                        position: 'absolute',
                        width: { xs: '140px', md: '200px' },
                        top: '10%',
                        left: '20%',
                        borderRadius: 1,
                        boxShadow: '2',
                        animation: 'float1 6s ease-in-out infinite',
                        '@keyframes float1': {
                            '0%': { transform: 'translate(0, 0)' },
                            '50%': { transform: 'translate(5px, -15px)' },
                            '100%': { transform: 'translate(0, 0)' }
                        }
                    }}>
                        <CardContent sx={{
                            p: 2, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            < ExploreIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                                Explore Countries
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Card 2 - Insights */}
                    <Card sx={{
                        position: 'absolute',
                        width: { xs: '140px', md: '200px' },
                        top: '15%',
                        right: '20%',
                        borderRadius: 1,
                        boxShadow: '2',
                        animation: 'float2 7s ease-in-out infinite',
                        '@keyframes float2': {
                            '0%': { transform: 'translate(0, 0)' },
                            '50%': { transform: 'translate(-5px, -10px)' },
                            '100%': { transform: 'translate(0, 0)' }
                        }
                    }}>
                        <CardContent sx={{
                            p: 2, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <LanguageIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                                Detailed Insights
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Card 3 - User Features */}
                    <Card sx={{
                        position: 'absolute',
                        width: { xs: '140px', md: '200px' },
                        bottom: '5%',
                        left: '15%',
                        borderRadius: 1,
                        boxShadow: '2',
                        animation: 'float3 8s ease-in-out infinite',
                        '@keyframes float3': {
                            '0%': { transform: 'translate(0, 0)' },
                            '50%': { transform: 'translate(10px, 5px)' },
                            '100%': { transform: 'translate(0, 0)' }
                        }
                    }}>
                        <CardContent sx={{
                            p: 2, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <PeopleIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                                User Features
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Card 4 - Favorites */}
                    <Card sx={{
                        position: 'absolute',
                        width: { xs: '140px', md: '200px' },
                        bottom: '35%',
                        right: '10%',
                        borderRadius: 1,
                        boxShadow: '2',
                        animation: 'float4 9s ease-in-out infinite',
                        '@keyframes float4': {
                            '0%': { transform: 'translate(0, 0)' },
                            '50%': { transform: 'translate(-8px, 12px)' },
                            '100%': { transform: 'translate(0, 0)' }
                        }
                    }}>
                        <CardContent sx={{
                            p: 2, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FavoriteIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                                Save Favorites
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Card 5 - Compare Conutries */}
                    <Card sx={{
                        position: 'absolute',
                        width: { xs: '140px', md: '200px' },
                        top: '45%',
                        left: '5%',
                        borderRadius: 1,
                        boxShadow: '2',
                        animation: 'float5 7.5s ease-in-out infinite',
                        '@keyframes float5': {
                            '0%': { transform: 'translate(0, 0)' },
                            '50%': { transform: 'translate(12px, -8px)' },
                            '100%': { transform: 'translate(0, 0)' }
                        }
                    }}>
                        <CardContent sx={{
                            p: 2, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CompareIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                                Compare Countries
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Card 6 - Country Facts */}
                    <Card sx={{
                        position: 'absolute',
                        width: { xs: '140px', md: '200px' },
                        bottom: '2%',
                        right: '15%',
                        borderRadius: 1,
                        boxShadow: '2',
                        animation: 'float6 8.5s ease-in-out infinite',
                        '@keyframes float6': {
                            '0%': { transform: 'translate(0, 0)' },
                            '50%': { transform: 'translate(-10px, -5px)' },
                            '100%': { transform: 'translate(0, 0)' }
                        }
                    }}>
                        <CardContent sx={{
                            p: 2, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <InfoIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                                Country Facts
                            </Typography>
                        </CardContent>
                    </Card>

                </Box>
            </Box>

            {/* Welcome Text */}
            <Box sx={{ textAlign: 'center', mb: 10 }}>
                <Typography variant="h5" component="p" sx={{ mb: 3, fontWeight: 500, lineHeight: 1.6 }}>
                    Welcome to Country Explorer, your comprehensive guide to countries around the globe.
                    Discover detailed information about nations, their cultures, populations, and more through
                    our interactive interface powered by the REST Countries API.
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 800, textAlign: 'center' }}>
                Global Statistics
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid
                container
                spacing={3}
                sx={{
                    mb: 10,
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Grid item xs={12} sm={4} sx={{ display: 'flex' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 1,
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            border: 1,
                            borderColor: 'divider',
                            width: '300px',
                            height: '100%'
                        }}
                    >
                        <PublicIcon sx={{ fontSize: 40, mb: 1, color: 'primary.main' }} />
                        <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                            {stats.total}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Countries</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 1,
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            border: 1,
                            borderColor: 'divider',
                            width: '300px',
                            height: '100%'
                        }}
                    >
                        <LanguageIcon sx={{ fontSize: 40, mb: 1, color: 'primary.main' }} />
                        <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                            {stats.regions}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Regions</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 1,
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            border: 1,
                            borderColor: 'divider',
                            width: '300px',
                            height: '100%'
                        }}
                    >
                        <PeopleIcon sx={{ fontSize: 40, mb: 1, color: 'primary.main' }} />
                        <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                            7.9B+
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Global Population</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Featured Countries */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 800, textAlign: 'center' }}>
                    Featured Countries
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {featuredCountries.map((country) => (
                        <Grid item xs={12} sm={6} md={4} key={country.name.common} sx={{ display: 'flex' }}>
                            <Card sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 1,
                                overflow: 'hidden',
                                border: 1,
                                borderColor: 'divider',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.02)'
                                }
                            }}>
                                <Box sx={{
                                    position: 'relative',
                                    height: 200, // Fixed height for all flag containers
                                    bgcolor: 'rgba(0,0,0,0.03)', // Light background for flags with transparency
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
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
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

            {/* Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
                <Button
                    component={Link}
                    to="/countries"
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 1,
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 500
                    }}
                >
                    Explore All Countries
                </Button>
            </Box>
        </Container >
    );
};

export default Dashboard;
