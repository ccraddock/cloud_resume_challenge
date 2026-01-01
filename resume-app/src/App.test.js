import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders main app structure', () => {
    render(<App />);

    expect(screen.getByText('Cameron Craddock')).toBeInTheDocument();
    expect(screen.getByText(/Machine Learning Engineer/)).toBeInTheDocument();
  });

  test('renders header component', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /Email/i })).toBeInTheDocument();
  });

  test('renders sidebar component', () => {
    render(<App />);

    expect(screen.getByText('Tech Skills')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);

    expect(screen.getByText(/Resume powered by React/)).toBeInTheDocument();
  });
});