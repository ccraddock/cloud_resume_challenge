import React from 'react';

export default function Header({ selectedResume, onResumeChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Cameron Craddock</h1>
        </div>
        <div className="header-dropdown">
          <label htmlFor="resume-select">Select Resume:</label>
          <select
            id="resume-select"
            value={selectedResume}
            onChange={e => onResumeChange(e.target.value)}
          >
            <option value="ml">Machine Learning Engineer</option>
            <option value="neuroscience">Computational Neuropsychiatry Researcher</option>
          </select>
        </div>
      </div>
    </header>
  );
}