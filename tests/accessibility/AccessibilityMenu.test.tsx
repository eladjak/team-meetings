import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibilityMenu } from '../../src/components/accessibility/AccessibilityMenu';
import { useAccessibility } from '../../src/hooks/useAccessibility';

// Mock the useAccessibility hook
jest.mock('../../src/hooks/useAccessibility');

describe('AccessibilityMenu', () => {
  const mockUseAccessibility = {
    settings: {
      fontSize: 16,
      contrast: 'normal',
      reducedMotion: false,
      screenReader: false
    },
    changeFontSize: jest.fn(),
    toggleContrast: jest.fn(),
    toggleMotion: jest.fn(),
    toggleScreenReader: jest.fn()
  };

  beforeEach(() => {
    (useAccessibility as jest.Mock).mockReturnValue(mockUseAccessibility);
  });

  it('renders accessibility button', () => {
    render(<AccessibilityMenu />);
    expect(screen.getByLabelText('פתח תפריט נגישות')).toBeInTheDocument();
  });

  it('opens menu on button click', () => {
    render(<AccessibilityMenu />);
    fireEvent.click(screen.getByLabelText('פתח תפריט נגישות'));
    expect(screen.getByText('הגדרות נגישות')).toBeInTheDocument();
  });

  it('changes font size', () => {
    render(<AccessibilityMenu />);
    fireEvent.click(screen.getByLabelText('פתח תפריט נגישות'));
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 20 } });
    expect(mockUseAccessibility.changeFontSize).toHaveBeenCalledWith(20);
  });

  // Add more tests as needed
}); 