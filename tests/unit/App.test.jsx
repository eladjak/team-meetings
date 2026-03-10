/**
 * בדיקות ליחידת App
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../src/context/ThemeContext';
import App from '../../src/App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
}); 