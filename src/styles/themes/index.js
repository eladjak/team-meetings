import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

const commonThemeProps = {
  direction: 'rtl',
  typography: {
    fontFamily: 'Rubik, Arial, sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
};

export const lightTheme = createTheme({
  ...commonThemeProps,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    },
    text: {
      primary: '#000000',
      secondary: '#666666'
    }
  },
  components: {
    ...commonThemeProps.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff'
        }
      }
    }
  }
}, heIL);

export const darkTheme = createTheme({
  ...commonThemeProps,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3'
    }
  },
  components: {
    ...commonThemeProps.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e'
        }
      }
    }
  }
}, heIL); 