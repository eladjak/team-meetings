import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const AccessibilityTooltip: React.FC = () => (
  <Tooltip title="לחץ על סמל הנגישות כדי לשנות הגדרות נגישות כמו גודל טקסט, ניגודיות ואנימציות">
    <IconButton size="small" color="inherit">
      <HelpOutlineIcon />
    </IconButton>
  </Tooltip>
); 