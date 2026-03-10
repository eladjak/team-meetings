import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <MuiGlobalStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        'html, body': {
          width: '100%',
          height: '100%',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        '.high-contrast': {
          filter: 'contrast(1.5)',
        },
        '.reduced-motion *': {
          transition: 'none !important',
          animation: 'none !important',
        },
        // Calendar specific styles
        '.calendar-event': {
          borderRadius: '4px',
          padding: '4px 8px',
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
        // Responsive styles
        '@media (max-width: 600px)': {
          '.responsive-container': {
            padding: '8px',
          },
          '.responsive-text': {
            fontSize: '0.875rem',
          },
        },
        '@media (min-width: 601px) and (max-width: 960px)': {
          '.responsive-container': {
            padding: '16px',
          },
        },
        '@media (min-width: 961px)': {
          '.responsive-container': {
            padding: '24px',
          },
        },
      }}
    />
  );
};

export default GlobalStyles; 