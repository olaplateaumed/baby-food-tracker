import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A5D6D9',
      light: '#C2E4E6',
      dark: '#7FB8BC',
    },
    secondary: {
      main: '#FFC5C5',
      light: '#FFD8D8',
      dark: '#FFB2B2',
    },
    background: {
      default: '#F8F9FF',
      paper: '#FFFFFF',
    },
    error: {
      main: '#FF9B9B',
      light: '#FFBDBD',
      dark: '#FF7979',
    },
    warning: {
      main: '#FFD1A1',
      light: '#FFE1C1',
      dark: '#FFC181',
    },
    success: {
      main: '#9EDEC1',
      light: '#BEE9D4',
      dark: '#7EC3A2',
    },
    text: {
      primary: '#4A5568',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: "'Quicksand', 'Roboto', 'Helvetica', sans-serif",
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      color: '#3D4852',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      color: '#3D4852',
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      color: '#3D4852',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#3D4852',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
      color: '#4A5568',
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#718096',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      color: '#4A5568',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#718096',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 28px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(165, 214, 217, 0.15)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(165, 214, 217, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(165, 214, 217, 0.1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(165, 214, 217, 0.1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(165, 214, 217, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(165, 214, 217, 0.04)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(165, 214, 217, 0.15)',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '1rem',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: '1px solid rgba(165, 214, 217, 0.1)',
        },
        elevation1: {
          boxShadow: '0 4px 12px rgba(165, 214, 217, 0.1)',
        },
        elevation2: {
          boxShadow: '0 6px 16px rgba(165, 214, 217, 0.15)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(165, 214, 217, 0.2)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '20px',
          boxShadow: '0 12px 32px rgba(165, 214, 217, 0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          height: '32px',
          fontSize: '0.875rem',
          fontWeight: 500,
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: (factor) => `${factor * 8}px`,
  shadows: [
    'none',
    '0 2px 4px rgba(165, 214, 217, 0.1)',
    '0 4px 12px rgba(165, 214, 217, 0.15)',
    '0 8px 24px rgba(165, 214, 217, 0.2)',
    '0 12px 32px rgba(165, 214, 217, 0.25)',
    ...Array(20).fill('none'),
  ],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);