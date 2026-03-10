/**
 * קומפוננטת החלפת ערכת נושא
 */

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDarkMode ? 'מצב בהיר' : 'מצב כהה'}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={isDarkMode ? 'עבור למצב בהיר' : 'עבור למצב כהה'}
      >
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 