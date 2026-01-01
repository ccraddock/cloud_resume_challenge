import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
  test('renders quick info section', () => {
    render(<Sidebar />);

    expect(screen.getByText('Quick Info')).toBeInTheDocument();
    expect(screen.getByText(/Austin, TX/)).toBeInTheDocument();
  });

  test('renders tech skills', () => {
    render(<Sidebar />);

    expect(screen.getByText('Tech Skills')).toBeInTheDocument();
    expect(screen.getByText('PyTorch')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
  });

  test('renders education section', () => {
    render(<Sidebar />);

    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText(/PhD Electrical & Computer Engineering/)).toBeInTheDocument();
    expect(screen.getByText(/Georgia Tech/)).toBeInTheDocument();
  });

  test('displays all education degrees', () => {
    render(<Sidebar />);

    const phd = screen.getByText(/PhD Electrical & Computer Engineering/);
    const ms = screen.getByText(/MS Electrical & Computer Engineering/);
    const bs = screen.getByText(/BS Computer Engineering/);

    expect(phd).toBeInTheDocument();
    expect(ms).toBeInTheDocument();
    expect(bs).toBeInTheDocument();
  });
});