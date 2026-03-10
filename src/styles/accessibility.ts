export const accessibilityStyles = {
  // High contrast styles
  '[data-contrast="high"]': {
    '& *': {
      backgroundColor: '#ffffff !important',
      color: '#000000 !important',
      borderColor: '#000000 !important'
    }
  },
  
  // Dark mode styles
  '[data-contrast="dark"]': {
    '& *': {
      backgroundColor: '#000000 !important',
      color: '#ffffff !important',
      borderColor: '#ffffff !important'
    }
  },

  // Reduced motion styles
  '[data-reduced-motion="true"]': {
    '& *': {
      transition: 'none !important',
      animation: 'none !important'
    }
  },

  // Screen reader only elements
  '.sr-only': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0'
  }
}; 