/**
 * קומפוננטת כותרת ראשית
 */

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import AccessibilityMenu from '../accessibility/AccessibilityMenu';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const MainHeader: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ gap: 1.5 }}>
        {/* Logo icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 38,
            height: 38,
            borderRadius: '10px',
            background: isDarkMode
              ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)'
              : 'rgba(255,255,255,0.2)',
            boxShadow: isDarkMode ? '0 2px 12px rgba(168,85,247,0.5)' : 'none',
            flexShrink: 0,
          }}
        >
          <CalendarMonth sx={{ fontSize: 22, color: '#fff' }} />
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          component="h1"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: '0.03em',
            background: isDarkMode
              ? 'linear-gradient(90deg, #f1f5f9 0%, #c084fc 100%)'
              : undefined,
            WebkitBackgroundClip: isDarkMode ? 'text' : undefined,
            WebkitTextFillColor: isDarkMode ? 'transparent' : undefined,
            backgroundClip: isDarkMode ? 'text' : undefined,
          }}
        >
          ניהול פגישות צוות
        </Typography>

        {/* Live badge */}
        {isDarkMode && (
          <Chip
            label="Live"
            size="small"
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 600,
              backgroundColor: 'rgba(34, 211, 238, 0.15)',
              color: '#22d3ee',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              '& .MuiChip-label': { px: 1 },
            }}
          />
        )}

        <Box sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}>
          <AccessibilityMenu />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;