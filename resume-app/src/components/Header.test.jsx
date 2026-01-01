import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header Component', () => {
  it('renders header with name and subtitle', () => {
    render(<Header onResumeChange={vi.fn()} />);

    expect(screen.getByText('Cameron Craddock')).toBeInTheDocument();
    expect(screen.getByText(/Machine Learning Engineer/)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /Email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
  });

  it('email link has correct href', () => {
    render(<Header />);

    const emailLink = screen.getByRole('link', { name: /Email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:cameron.craddock@gmail.com');
  });

  it('external links open in new tab', () => {
    render(<Header />);

    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    const githubLink = screen.getByRole('link', { name: /GitHub/i });

    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders resume selector dropdown', () => {
    render(<Header onResumeChange={vi.fn()} />);

    expect(screen.getByLabelText(/Select Resume/i)).toBeInTheDocument();
  });

  it('has correct dropdown options', () => {
    render(<Header onResumeChange={vi.fn()} />);

    expect(screen.getByRole('option', { name: /Machine Learning Engineer/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Computational Neuropsychiatry Researcher/i })).toBeInTheDocument();
  });

  it('calls onResumeChange when dropdown changes', async () => {
    const user = userEvent.setup();
    const onResumeChange = vi.fn();

    render(<Header onResumeChange={onResumeChange} />);

    const select = screen.getByLabelText(/Select Resume/i);
    await user.selectOptions(select, 'neuroscience');

    expect(onResumeChange).toHaveBeenCalledWith('neuroscience');
  });

  it('starts with Machine Learning Engineer selected', () => {
    render(<Header onResumeChange={vi.fn()} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('ml');
  });
});