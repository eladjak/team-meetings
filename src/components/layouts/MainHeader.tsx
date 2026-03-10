/**
 * קומפוננטת כותרת ראשית
 */

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import AccessibilityMenu from '../accessibility/AccessibilityMenu';
import ThemeToggle from './ThemeToggle';

const MainHeader: React.FC = () => {
  console.log('MainHeader: Rendering');
  
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'primary.main'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="h1"
          sx={{ flexGrow: 1 }}
        >
          ניהול פגישות צוות
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          alignItems: 'center',
          marginLeft: 2
        }}>
          <AccessibilityMenu />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;