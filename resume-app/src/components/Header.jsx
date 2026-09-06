import React, { useRef } from 'react';
import './Header.css';

const FONT_OPTIONS = [
  { id: 'modern', label: 'Modern Sans', description: 'Clean system sans-serif' },
  { id: 'humanist', label: 'Humanist', description: 'Warmer, more conversational sans-serif' },
  { id: 'editorial', label: 'Editorial', description: 'Sans body with serif display type' },
  { id: 'classic', label: 'Classic Serif', description: 'Traditional résumé typography' },
  { id: 'technical', label: 'Technical', description: 'Sans body with monospaced display type' },
];

function isSafeResumePdf(pdf) {
  return typeof pdf === 'string' && /^\/resumes\/[A-Za-z0-9._-]+\.pdf$/i.test(pdf);
}

export default function Header({
  selectedResume,
  onResumeChange,
  pdf,
  fontTheme,
  onFontChange,
}) {
  const safePdf = isSafeResumePdf(pdf) ? pdf : '';
  const fontMenuRef = useRef(null);
  const activeFont = FONT_OPTIONS.find((option) => option.id === fontTheme) || FONT_OPTIONS[0];

  function selectFont(theme) {
    onFontChange(theme);
    if (fontMenuRef.current) fontMenuRef.current.removeAttribute('open');
  }

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

          <details className="font-menu" ref={fontMenuRef}>
            <summary aria-label={`Font style: ${activeFont.label}`}>
              <span className="font-menu-label">Font</span>
              <span className="font-menu-current">{activeFont.label}</span>
            </summary>
            <div className="font-menu-panel" role="menu" aria-label="Choose font style">
              {FONT_OPTIONS.map((option) => (
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={fontTheme === option.id}
                  className={`font-option${fontTheme === option.id ? ' active' : ''}`}
                  key={option.id}
                  onClick={() => selectFont(option.id)}
                >
                  <span className="font-option-name">{option.label}</span>
                  <span className="font-option-description">{option.description}</span>
                </button>
              ))}
            </div>
          </details>

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
