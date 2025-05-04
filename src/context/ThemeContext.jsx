// src/context/ThemeContext.jsx
import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

export const ColorModeContext = createContext({
  toggleColorMode: () => { },
  mode: 'light'
});

export const ThemeProviderWrapper = ({ children }) => {
  // Try to get saved preference from localStorage, default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  // Save mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            'sans-serif',
          ].join(','),
          allVariants: {
            fontFamily: 'Inter, sans-serif',
          },
          h4: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 500,
          },
          body1: {
            fontSize: '1rem',
          },
          body2: {
            fontSize: '0.875rem',
          },
          button: {
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 8,
        },
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // Light mode palette
              primary: {
                main: '#3b82f6', // Matches the blue from the design
              },
              background: {
                default: '#ffffff',
                paper: '#ffffff',
              },
              text: {
                primary: '#111827',
                secondary: '#6b7280',
              },
              divider: '#e5e7eb',
            }
            : {
              // Dark mode palette
              primary: {
                main: '#60a5fa', // Lighter blue for dark mode
              },
              background: {
                default: '#0f172a', // Deep blue-black
                paper: '#1e293b', // Slightly lighter than background
              },
              text: {
                primary: '#f8fafc',
                secondary: '#94a3b8',
              },
              divider: '#334155',
            }),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#0f172a',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 6,
                fontWeight: 500,
              },
              contained: {
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              },
              outlined: {
                borderColor: mode === 'light' ? '#e5e7eb' : '#334155',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                boxShadow: mode === 'light'
                  ? '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
                  : 'none',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 6,
                  '& fieldset': {
                    borderColor: mode === 'light' ? '#e5e7eb' : '#334155',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'light' ? '#d1d5db' : '#475569',
                  },
                },
              },
            },
          },
          MuiCheckbox: {
            styleOverrides: {
              root: {
                color: mode === 'light' ? '#9ca3af' : '#64748b',
              },
            },
          },
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor: mode === 'light' ? '#e5e7eb' : '#334155',
              },
            },
          },
          MuiLink: {
            styleOverrides: {
              root: {
                color: mode === 'light' ? '#3b82f6' : '#60a5fa',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};