import { createTheme, responsiveFontSizes, alpha } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

// Dark mode palette
const DARK_BG = '#0a0a1a';
const DARK_PAPER = 'rgba(16, 16, 36, 0.85)';
const DARK_PAPER_SOLID = '#10101e';
const DARK_PAPER_ELEVATED = 'rgba(26, 26, 56, 0.9)';
const PURPLE_MAIN = '#a855f7';
const PURPLE_LIGHT = '#c084fc';
const PURPLE_DARK = '#7c3aed';
const CYAN_MAIN = '#22d3ee';
const CYAN_DARK = '#0891b2';
const BORDER_DARK = 'rgba(168, 85, 247, 0.18)';

export const createAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  let theme = createTheme({
    direction: 'rtl',
    palette: {
      mode,
      primary: {
        main: isDark ? PURPLE_MAIN : '#6d28d9',
        light: isDark ? PURPLE_LIGHT : '#8b5cf6',
        dark: isDark ? PURPLE_DARK : '#4c1d95',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isDark ? CYAN_MAIN : CYAN_DARK,
        light: isDark ? '#67e8f9' : '#22d3ee',
        dark: isDark ? CYAN_DARK : '#0e7490',
        contrastText: isDark ? '#0a0a1a' : '#ffffff',
      },
      background: {
        default: isDark ? DARK_BG : '#f1f5f9',
        paper: isDark ? DARK_PAPER_SOLID : '#ffffff',
      },
      text: {
        primary: isDark ? '#f1f5f9' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569',
      },
      divider: isDark ? BORDER_DARK : 'rgba(0,0,0,0.12)',
      action: {
        selected: isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(109, 40, 217, 0.08)',
        hover: isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(109, 40, 217, 0.06)',
      },
    },
    typography: {
      fontFamily: '"Assistant", "Roboto", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 700,
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isDark ? `${PURPLE_DARK} ${DARK_BG}` : '#6b6b6b #f1f5f9',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              width: '8px',
              backgroundColor: isDark ? DARK_BG : '#f1f5f9',
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: isDark ? PURPLE_DARK : '#94a3b8',
              border: '2px solid transparent',
              backgroundClip: 'content-box',
            },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
              backgroundColor: isDark ? PURPLE_MAIN : '#64748b',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: isDark ? {
            background: `linear-gradient(135deg, rgba(10,10,26,0.95) 0%, rgba(20,10,40,0.98) 100%)`,
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${BORDER_DARK}`,
            boxShadow: `0 1px 20px rgba(168, 85, 247, 0.15)`,
          } : {
            background: `linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)`,
            boxShadow: '0 2px 12px rgba(109, 40, 217, 0.3)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: isDark ? {
            backgroundColor: DARK_PAPER_SOLID,
            backgroundImage: 'none',
            border: `1px solid ${BORDER_DARK}`,
            backdropFilter: 'blur(12px)',
          } : {
            backgroundImage: 'none',
          },
          elevation1: isDark ? {
            backgroundColor: DARK_PAPER_SOLID,
            boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${BORDER_DARK}`,
          } : {},
        },
      },
      MuiCard: {
        styleOverrides: {
          root: isDark ? {
            backgroundColor: DARK_PAPER_ELEVATED,
            backgroundImage: 'none',
            border: `1px solid ${BORDER_DARK}`,
            backdropFilter: 'blur(12px)',
            '&:hover': {
              border: `1px solid rgba(168, 85, 247, 0.4)`,
              boxShadow: `0 8px 32px rgba(168, 85, 247, 0.15)`,
            },
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          } : {},
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontWeight: 600,
            textTransform: 'none',
            transition: 'all 0.2s ease',
          },
          containedPrimary: isDark ? {
            background: `linear-gradient(135deg, ${PURPLE_MAIN} 0%, ${PURPLE_DARK} 100%)`,
            boxShadow: `0 4px 15px rgba(168, 85, 247, 0.35)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${PURPLE_LIGHT} 0%, ${PURPLE_MAIN} 100%)`,
              boxShadow: `0 6px 20px rgba(168, 85, 247, 0.5)`,
              transform: 'translateY(-1px)',
            },
          } : {},
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: isDark ? {
            '&:hover': {
              backgroundColor: 'rgba(168, 85, 247, 0.12)',
            },
          } : {},
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: isDark ? {
            borderColor: BORDER_DARK,
            color: '#94a3b8',
            '&.Mui-selected': {
              backgroundColor: 'rgba(168, 85, 247, 0.2)',
              color: PURPLE_LIGHT,
              borderColor: `rgba(168, 85, 247, 0.5)`,
              '&:hover': {
                backgroundColor: 'rgba(168, 85, 247, 0.28)',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(168, 85, 247, 0.08)',
            },
          } : {},
        },
      },
      MuiChip: {
        styleOverrides: {
          root: isDark ? {
            borderColor: BORDER_DARK,
            '&.MuiChip-outlined': {
              borderColor: BORDER_DARK,
            },
          } : {},
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: isDark ? {
            backgroundColor: '#0f0f22',
            backgroundImage: 'none',
            border: `1px solid rgba(168, 85, 247, 0.25)`,
            boxShadow: `0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(168, 85, 247, 0.1)`,
          } : {},
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: isDark ? {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: BORDER_DARK,
              },
              '&:hover fieldset': {
                borderColor: 'rgba(168, 85, 247, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: PURPLE_MAIN,
                boxShadow: `0 0 0 3px rgba(168, 85, 247, 0.12)`,
              },
            },
          } : {},
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: isDark ? {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: BORDER_DARK,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(168, 85, 247, 0.4)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: PURPLE_MAIN,
            },
          } : {},
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: isDark ? {
            backgroundColor: '#1a1a3a',
            border: `1px solid ${BORDER_DARK}`,
            color: '#e2e8f0',
            backdropFilter: 'blur(8px)',
          } : {},
        },
      },
    },
  }, heIL);

  theme = responsiveFontSizes(theme);

  return theme;
};