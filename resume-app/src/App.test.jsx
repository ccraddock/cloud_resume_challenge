import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders main app structure', () => {
    render(<App />);

    expect(screen.getByText('Cameron Craddock')).toBeInTheDocument();
    expect(screen.getByText(/Machine Learning Engineer/)).toBeInTheDocument();
  });

  it('renders header with resume selector', () => {
    render(<App />);

    expect(screen.getByLabelText(/Select Resume/i)).toBeInTheDocument();
  });

  it('renders sidebar component', () => {
    render(<App />);

    expect(screen.getByText('Tech Skills')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<App />);

    expect(screen.getByText(/Resume powered by React/)).toBeInTheDocument();
  });
});