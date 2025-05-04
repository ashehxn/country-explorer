import React from 'react';
import { Box, useTheme } from '@mui/material';

const BackgroundBubbles = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none', // Allows clicking through the bubbles
            zIndex: -1,
            overflow: 'hidden',
            width: '100%'
        }}>
            {/* Large bubbles */}
            {[...Array(1)].map((_, i) => (
                <Box
                    key={`large-bubble-${i}`}
                    sx={{
                        position: 'absolute',
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        opacity: 0.05,
                        bgcolor: i % 2 === 0 ? 'primary.main' : 'secondary.main',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `floatBubble${i} ${Math.random() * 10 + 10}s ease-in-out infinite`,
                        [`@keyframes floatBubble${i}`]: {
                            '0%': { transform: 'translate(0, 0)' },
                            '50%': { transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)` },
                            '100%': { transform: 'translate(0, 0)' }
                        }
                    }}
                />
            ))}

            {/* Small bubbles */}
            {[...Array(4)].map((_, i) => (
                <Box
                    key={`small-bubble-${i}`}
                    sx={{
                        position: 'absolute',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        opacity: 0.05,
                        bgcolor: i % 3 === 0 ? 'primary.main' : i % 3 === 1 ? 'secondary.main' : 'info.main',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `floatSmallBubble${i} ${Math.random() * 8 + 5}s ease-in-out infinite`,
                        [`@keyframes floatSmallBubble${i}`]: {
                            '0%': { transform: 'translate(0, 0)' },
                            '50%': { transform: `translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px)` },
                            '100%': { transform: 'translate(0, 0)' }
                        }
                    }}
                />
            ))}
        </Box>
    );
};

export default BackgroundBubbles;
