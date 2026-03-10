/**
 * תפריט נגישות
 */

import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Switch,
  Slider,
  Box,
  Tooltip
} from '@mui/material';
import {
  Accessibility as AccessibilityIcon,
  TextFields,
  Contrast,
  Animation,
  VolumeUp
} from '@mui/icons-material';
import { useAccessibility } from '../../hooks/useAccessibility';

export const AccessibilityMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {
    settings,
    changeFontSize,
    toggleContrast,
    toggleMotion,
    toggleScreenReader
  } = useAccessibility();

  return (
    <>
      <Tooltip title="הגדרות נגישות">
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-label="פתח תפריט נגישות"
          color="inherit"
        >
          <AccessibilityIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: { width: 320, p: 2 }
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          הגדרות נגישות
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>
            <TextFields /> גודל טקסט
          </Typography>
          <Slider
            value={settings.fontSize}
            min={12}
            max={24}
            step={1}
            onChange={(_, value) => changeFontSize(value as number)}
            aria-label="גודל טקסט"
            valueLabelDisplay="auto"
          />
        </Box>

        <MenuItem onClick={toggleContrast}>
          <Contrast sx={{ mr: 2 }} />
          <Typography>ניגודיות</Typography>
          <Typography sx={{ ml: 'auto', color: 'text.secondary' }}>
            {settings.contrast === 'normal' ? 'רגיל' : settings.contrast === 'high' ? 'גבוה' : 'מצב כהה'}
          </Typography>
        </MenuItem>

        <MenuItem onClick={toggleMotion}>
          <Animation sx={{ mr: 2 }} />
          <Typography>הפחתת תנועה</Typography>
          <Switch
            checked={settings.reducedMotion}
            edge="end"
          />
        </MenuItem>

        <MenuItem onClick={toggleScreenReader}>
          <VolumeUp sx={{ mr: 2 }} />
          <Typography>קורא מסך</Typography>
          <Switch
            checked={settings.screenReader}
            edge="end"
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccessibilityMenu;