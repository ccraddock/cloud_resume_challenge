import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders header with name and subtitle', () => {
    render(<Header />);

    expect(screen.getByText('Cameron Craddock')).toBeInTheDocument();
    expect(screen.getByText(/Machine Learning Engineer/)).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
  });

  test('email link has correct href', () => {
    render(<Header />);

    const emailLink = screen.getByRole('link', { name: /Email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:cameron.craddock@gmail.com');
  });

  test('external links open in new tab', () => {
    render(<Header />);

    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    const githubLink = screen.getByRole('link', { name: /GitHub/i });

    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });
});