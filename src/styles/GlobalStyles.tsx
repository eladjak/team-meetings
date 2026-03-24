import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GlobalStyles = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Dark mode calendar palette
  const calBg = isDark ? '#0a0a1a' : '#ffffff';
  const calPaper = isDark ? '#10101e' : '#ffffff';
  const calBorder = isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(0,0,0,0.12)';
  const calHeaderBg = isDark ? 'rgba(16, 16, 36, 0.9)' : '#f8f9fa';
  const calTodayBg = isDark ? 'rgba(168, 85, 247, 0.12)' : 'rgba(109, 40, 217, 0.08)';
  const calText = isDark ? '#e2e8f0' : '#0f172a';
  const calTextMuted = isDark ? '#64748b' : '#94a3b8';
  const calToolbarBg = isDark ? 'rgba(16, 16, 36, 0.95)' : '#f8f9fa';
  const calBtnBg = isDark ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' : undefined;
  const calBtnHover = isDark ? 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)' : undefined;
  const calSlotBg = isDark ? 'rgba(10, 10, 26, 0.6)' : undefined;
  const calSlotHover = isDark ? 'rgba(168, 85, 247, 0.1)' : undefined;

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
          backgroundImage: isDark
            ? 'radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(34, 211, 238, 0.04) 0%, transparent 50%)'
            : 'none',
          backgroundAttachment: 'fixed',
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
        // Calendar event styles
        '.calendar-event': {
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
        // =====================
        // react-big-calendar dark overrides
        // =====================
        '.rbc-calendar': {
          backgroundColor: calBg,
          color: calText,
          borderRadius: '12px',
          overflow: 'hidden',
        },
        '.rbc-toolbar': {
          backgroundColor: calToolbarBg,
          padding: '12px 16px',
          borderBottom: `1px solid ${calBorder}`,
          backdropFilter: isDark ? 'blur(12px)' : undefined,
        },
        '.rbc-toolbar .rbc-toolbar-label': {
          color: calText,
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '0.03em',
          background: isDark ? 'linear-gradient(90deg, #f1f5f9 0%, #c084fc 100%)' : undefined,
          WebkitBackgroundClip: isDark ? 'text' : undefined,
          WebkitTextFillColor: isDark ? 'transparent' : undefined,
          backgroundClip: isDark ? 'text' : undefined,
        },
        '.rbc-btn-group button': {
          background: isDark ? 'rgba(16, 16, 36, 0.8)' : undefined,
          color: isDark ? '#94a3b8' : undefined,
          border: isDark ? `1px solid ${calBorder}` : undefined,
          borderRadius: '8px !important',
          padding: '6px 14px',
          fontSize: '0.85rem',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          '& + button': {
            marginLeft: isDark ? '4px' : undefined,
          },
        },
        '.rbc-btn-group button:hover': {
          background: isDark ? 'rgba(168, 85, 247, 0.15)' : undefined,
          color: isDark ? '#c084fc' : undefined,
          borderColor: isDark ? 'rgba(168, 85, 247, 0.4)' : undefined,
          transform: 'translateY(-1px)',
        },
        '.rbc-btn-group button.rbc-active': {
          background: isDark ? calBtnBg : undefined,
          color: '#ffffff',
          borderColor: isDark ? 'transparent' : undefined,
          boxShadow: isDark ? '0 4px 15px rgba(168, 85, 247, 0.4)' : undefined,
        },
        '.rbc-btn-group button.rbc-active:hover': {
          background: isDark ? calBtnHover : undefined,
        },
        '.rbc-header': {
          backgroundColor: calHeaderBg,
          color: calText,
          borderBottom: `1px solid ${calBorder}`,
          padding: '10px 8px',
          fontWeight: 600,
          fontSize: '0.85rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase' as const,
        },
        '.rbc-month-view': {
          backgroundColor: calBg,
          border: `1px solid ${calBorder}`,
          borderRadius: '0 0 12px 12px',
        },
        '.rbc-month-row': {
          borderBottom: `1px solid ${calBorder}`,
        },
        '.rbc-day-bg': {
          backgroundColor: calSlotBg,
          transition: 'background-color 0.15s ease',
        },
        '.rbc-day-bg:hover': {
          backgroundColor: calSlotHover,
        },
        '.rbc-day-bg + .rbc-day-bg': {
          borderLeft: `1px solid ${calBorder}`,
        },
        '.rbc-off-range-bg': {
          backgroundColor: isDark ? 'rgba(5, 5, 15, 0.6)' : undefined,
        },
        '.rbc-off-range .rbc-button-link': {
          color: calTextMuted,
        },
        '.rbc-today': {
          backgroundColor: calTodayBg,
        },
        '.rbc-date-cell': {
          color: calText,
          padding: '4px 8px',
          textAlign: 'right',
        },
        '.rbc-date-cell .rbc-button-link': {
          color: calText,
          fontWeight: 500,
          fontSize: '0.9rem',
        },
        '.rbc-date-cell.rbc-now .rbc-button-link': {
          color: isDark ? '#a855f7' : '#6d28d9',
          fontWeight: 700,
        },
        '.rbc-event': {
          borderRadius: '6px',
          border: 'none',
          padding: '2px 6px',
          fontSize: '0.82rem',
          fontWeight: 500,
          transition: 'all 0.15s ease',
          boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.4)' : '0 1px 4px rgba(0,0,0,0.15)',
        },
        '.rbc-event:hover': {
          transform: 'scale(1.03)',
          boxShadow: isDark ? '0 4px 16px rgba(168, 85, 247, 0.35)' : '0 3px 10px rgba(0,0,0,0.2)',
          filter: 'brightness(1.1)',
        },
        '.rbc-event.rbc-selected': {
          boxShadow: isDark ? '0 0 0 3px rgba(168, 85, 247, 0.5)' : undefined,
          outline: 'none',
        },
        '.rbc-show-more': {
          color: isDark ? '#c084fc' : '#6d28d9',
          fontWeight: 600,
          fontSize: '0.8rem',
          background: 'transparent',
          '&:hover': {
            color: isDark ? '#a855f7' : '#4c1d95',
          },
        },
        '.rbc-time-view': {
          backgroundColor: calBg,
          border: `1px solid ${calBorder}`,
          borderRadius: '0 0 12px 12px',
        },
        '.rbc-time-header': {
          borderBottom: `1px solid ${calBorder}`,
        },
        '.rbc-time-content': {
          borderTop: `1px solid ${calBorder}`,
        },
        '.rbc-timeslot-group': {
          borderBottom: `1px solid ${calBorder}`,
          minHeight: '40px',
        },
        '.rbc-time-slot': {
          color: calTextMuted,
          fontSize: '0.78rem',
        },
        '.rbc-label': {
          color: calTextMuted,
          fontSize: '0.78rem',
        },
        '.rbc-current-time-indicator': {
          backgroundColor: isDark ? '#a855f7' : '#6d28d9',
          height: '2px',
          boxShadow: isDark ? '0 0 8px rgba(168, 85, 247, 0.6)' : undefined,
        },
        '.rbc-agenda-view table': {
          backgroundColor: calBg,
          color: calText,
        },
        '.rbc-agenda-view .rbc-agenda-table': {
          borderColor: calBorder,
        },
        '.rbc-agenda-view .rbc-agenda-table th': {
          backgroundColor: calHeaderBg,
          color: calText,
          borderBottom: `1px solid ${calBorder}`,
        },
        '.rbc-agenda-view .rbc-agenda-table td': {
          borderBottom: `1px solid ${calBorder}`,
        },
        '.rbc-overlay': {
          backgroundColor: isDark ? '#10101e' : '#ffffff',
          border: `1px solid ${calBorder}`,
          borderRadius: '12px',
          boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.6), 0 0 20px rgba(168, 85, 247, 0.1)' : '0 8px 30px rgba(0,0,0,0.15)',
          padding: '8px',
        },
        '.rbc-overlay-header': {
          color: calText,
          fontWeight: 600,
          borderBottom: `1px solid ${calBorder}`,
          paddingBottom: '8px',
          marginBottom: '8px',
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