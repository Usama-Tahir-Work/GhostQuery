import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF',
      light: '#9D97FF',
      dark: '#4B44CC',
    },
    secondary: {
      main: '#00D9A6',
      light: '#33E3BD',
      dark: '#00A87E',
    },
    error: {
      main: '#FF6B6B',
    },
    warning: {
      main: '#FFD93D',
    },
    success: {
      main: '#00D9A6',
    },
    background: {
      default: '#0A0E1A',
      paper: '#111827',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
    divider: 'rgba(148, 163, 184, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
      color: '#94A3B8',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: '0.9rem',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6C63FF 0%, #8B5CF6 100%)',
          boxShadow: '0 4px 15px rgba(108, 99, 255, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5B54E6 0%, #7C4FE0 100%)',
            boxShadow: '0 6px 20px rgba(108, 99, 255, 0.45)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(148, 163, 184, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: '1px solid rgba(108, 99, 255, 0.15)',
          background: '#141B2D',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#94A3B8',
        },
      },
    },
  },
});

export default theme;
