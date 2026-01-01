import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ResumeViewer from './ResumeViewer';

const mockHtml = `
  <div id="contents">
    <h1>CAMERON CRADDOCK</h1>
    <p>Machine Learning Engineer with extensive experience optimizing inference pipelines.</p>
    <h2>Professional Experience</h2>
    <p>Staff Machine Learning Engineer at Meta Platforms Inc</p>
  </div>
`;

describe('ResumeViewer Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders loading state initially', () => {
    global.fetch.mockImplementationOnce(
      () => new Promise(() => {}) // Never resolves
    );

    render(<ResumeViewer url="https://example.com/resume" />);

    expect(screen.getByText(/Loading your resume/i)).toBeInTheDocument();
  });

  test('fetches and renders resume content successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce(mockHtml),
    });

    render(<ResumeViewer url="https://example.com/resume" />);

    await waitFor(() => {
      expect(screen.getByText('CAMERON CRADDOCK')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText(/Machine Learning Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/Professional Experience/)).toBeInTheDocument();
  });

  test('handles fetch errors gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<ResumeViewer url="https://example.com/resume" />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to Load Resume/)).toBeInTheDocument();
    });

    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });

  test('handles HTTP errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<ResumeViewer url="https://example.com/resume" />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to Load Resume/)).toBeInTheDocument();
    });
  });

  test('calls fetch with correct URL and options', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce(mockHtml),
    });

    render(<ResumeViewer url="https://example.com/resume" />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://example.com/resume', {
        method: 'GET',
        cache: 'no-store',
      });
    });
  });

  test('sanitizes HTML content for security', async () => {
    const maliciousHtml = `
      <div id="contents">
        <h1>Test</h1>
        <script>alert('xss')</script>
        <p>Content</p>
      </div>
    `;

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce(maliciousHtml),
    });

    render(<ResumeViewer url="https://example.com/resume" />);

    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    // Script tag should be removed by DOMPurify
    const scripts = document.querySelectorAll('script');
    expect(scripts.length).toBe(0);
  });
});