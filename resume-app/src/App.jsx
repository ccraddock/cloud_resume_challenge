import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ResumeViewer from './components/ResumeViewer';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [selectedResume, setSelectedResume] = useState('ml2026');
  const [pdf, setPdf] = useState('');

  const resumeFiles = {
    ml2026: '/resumes/ml-resume-2026.json',
    ml: '/resumes/ml-resume.json',
    neuroscience: '/resumes/neuroscience-resume.json',
  };

  useEffect(() => {
    let active = true;

    fetch(resumeFiles[selectedResume], { credentials: 'same-origin' })
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
  }, [selectedResume]);

  const experienceHeading =
    selectedResume === 'ml2026'
      ? 'Professional Experience — Recent 10 Years of a 26-Year Career'
      : 'Professional Experience';

  return (
    <div className="app">
      <Header
        selectedResume={selectedResume}
        onResumeChange={setSelectedResume}
        pdf={pdf}
      />

      <div className="page-shell">
        <Sidebar />
        <main className="main-content" id="resume">
          <ResumeViewer
            url={resumeFiles[selectedResume]}
            experienceHeading={experienceHeading}
            key={selectedResume}
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
