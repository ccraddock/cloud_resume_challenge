import React from 'react';
import './Header.css';

function isSafeResumePdf(pdf) {
  return typeof pdf === 'string' && /^\/resumes\/[A-Za-z0-9._-]+\.pdf$/i.test(pdf);
}

export default function Header({ selectedResume, onResumeChange, pdf }) {
  const safePdf = isSafeResumePdf(pdf) ? pdf : '';

  return (
    <header className="header">
      <div className="header-content">
        <a className="identity" href="#resume" aria-label="Cameron Craddock résumé">
          <span className="identity-name">Cameron Craddock</span>
          <span className="identity-tagline">Machine Learning · Embedded AI · Systems Performance</span>
        </a>

        <div className="header-actions">
          <label htmlFor="resume-select" className="select-label">Résumé</label>
          <select
            id="resume-select"
            value={selectedResume}
            onChange={(event) => onResumeChange(event.target.value)}
            aria-label="Select résumé version"
          >
            <option value="ml2026">Machine Learning Engineer — 2026</option>
            <option value="ml">Machine Learning Engineer — 2025</option>
            <option value="neuroscience">Biomedical Imaging AI Researcher</option>
          </select>

          {safePdf && (
            <a
              href={safePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
            >
              PDF
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
