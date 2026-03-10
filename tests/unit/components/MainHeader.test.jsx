import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainHeader from '../../../src/components/layouts/MainHeader';

describe('MainHeader Component', () => {
  it('renders header with title', () => {
    render(<MainHeader />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
}); 