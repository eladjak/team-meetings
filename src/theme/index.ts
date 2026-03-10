import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

export const createAppTheme = (mode: 'light' | 'dark') => {
  console.log('Creating theme with mode:', mode);
  
  let theme = createTheme({
    direction: 'rtl',
    palette: {
      mode,
      primary: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2'
      },
      secondary: {
        main: '#f50057',
        light: '#ff4081',
        dark: '#c51162'
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e'
      }
    },
    typography: {
      fontFamily: '"Assistant", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#6b6b6b #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: mode === 'light' ? '#f5f5f5' : '#2b2b2b',
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: mode === 'light' ? '#6b6b6b' : '#6b6b6b',
              border: '3px solid transparent',
              backgroundClip: 'content-box',
            },
          }
        }
      }
    }
  }, heIL);

  theme = responsiveFontSizes(theme);
  
  return theme;
}; 