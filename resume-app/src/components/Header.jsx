import React from 'react';
import './Header.css';

function isSafeResumePdf(pdf) {
  return typeof pdf === 'string' && /^\/resumes\/[A-Za-z0-9._-]+\.pdf$/i.test(pdf);
}

export default function Header({ pdf }) {
  const safePdf = isSafeResumePdf(pdf) ? pdf : '';

  return (
    <header className="header">
      <div className="header-content">
        <a className="identity" href="#resume" aria-label="R. Cameron Craddock résumé">
          <span className="identity-name">R. Cameron Craddock</span>
          <span className="identity-tagline">Machine Learning · Embedded AI · Systems Performance</span>
        </a>

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
    </header>
  );
}
