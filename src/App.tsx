/**
 * קומפוננטת האפליקציה הראשית
 */

import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { he } from 'date-fns/locale';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { useTheme } from './context/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import MainCalendar from './components/Calendar/MainCalendar';
import MainHeader from './components/layouts/MainHeader';

const App: React.FC = () => {
  const { theme } = useTheme();
  
  console.log('App: Rendering with theme mode:', theme.palette.mode);

  return (
    <AccessibilityProvider>
      <MuiThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
          <CssBaseline />
          <GlobalStyles />
          <MainHeader />
          <Container 
            maxWidth="xl" 
            className="responsive-container"
            sx={{ 
              mt: { xs: 8, sm: 9 },
              mb: { xs: 2, sm: 3 },
              height: 'calc(100vh - 64px)'
            }}
          >
            <MainCalendar />
          </Container>
        </LocalizationProvider>
      </MuiThemeProvider>
    </AccessibilityProvider>
  );
};

export default App;