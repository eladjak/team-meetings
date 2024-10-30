import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';
import heLocale from 'date-fns/locale/he';
import MainLayout from './components/Layout/MainLayout';
import TeamCalendar from './components/Calendar/TeamCalendar';
import './App.css';

// יצירת תמה מותאמת עם תמיכה בעברית
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Rubik, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
}, heIL);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={heLocale}>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<TeamCalendar />} />
            </Routes>
          </MainLayout>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
