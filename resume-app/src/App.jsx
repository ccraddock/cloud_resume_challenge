import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ResumeViewer from './components/ResumeViewer';
import Sidebar from './components/Sidebar';
import './App.css';

const RESUME_URL = '/resumes/ml-resume-2026.json';
const EXPERIENCE_HEADING = 'Professional Experience — Recent 10 Years of a 26-Year Career';

function App() {
  const [pdf, setPdf] = useState('');

  useEffect(() => {
    let active = true;

    fetch(RESUME_URL, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load resume metadata (${response.status})`);
        return response.json();
      })
      .then((data) => {
        if (active) setPdf(typeof data.pdf === 'string' ? data.pdf : '');
      })
      .catch(() => {
        if (active) setPdf('');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="app">
      <Header pdf={pdf} />

      <div className="page-shell">
        <Sidebar />
        <main className="main-content" id="resume">
          <ResumeViewer
            url={RESUME_URL}
            experienceHeading={EXPERIENCE_HEADING}
          />
        </main>
      </div>

      <footer className="footer">
        <span>© 2026 Cameron Craddock</span>
        <span className="footer-separator" aria-hidden="true">·</span>
        <span>Austin, Texas</span>
      </footer>
    </div>
  );
}

export default App;
