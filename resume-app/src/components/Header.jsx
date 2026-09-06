import React from 'react';
import './Header.css';

export default function Header({ selectedResume, onResumeChange, pdf }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Cameron Craddock</h1>
        </div>
        <div className="header-dropdown" style={{ flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
          <label htmlFor="resume-select">Select Resume:</label>
          <select
            id="resume-select"
            value={selectedResume}
            onChange={e => onResumeChange(e.target.value)}
          >
            <option value="ml2026">Staff Machine Learning Engineer — 2026</option>
            <option value="ml">Machine Learning Engineer — 2025</option>
            <option value="neuroscience">Biomedical Imaging AI Researcher</option>
          </select>
          {pdf && (
            <a
              href={`/resumes/${pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
              style={{
                marginLeft: '1.5rem',
                color: '#fff',
                background: '#222',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              Download PDF
            </a>
          )}
        </div>
      </div>
    </header>
  );
}