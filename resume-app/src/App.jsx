import React, { useState, useEffect } from 'react';
import ResumeViewer from './components/ResumeViewer';
import Header from './components/Header';
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
    fetch(resumeFiles[selectedResume])
      .then((r) => r.json())
      .then((data) => setPdf(data.pdf || ''))
      .catch(() => setPdf(''));
  }, [selectedResume]);

  return (
    <div className="app">
      <Header selectedResume={selectedResume} onResumeChange={setSelectedResume} pdf={pdf} />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <ResumeViewer url={resumeFiles[selectedResume]} key={selectedResume} />
        </main>
      </div>
      <footer className="footer">
        <p>&copy; 2026 Cameron Craddock | Resume powered by React</p>
      </footer>
    </div>
  );
}

export default App;