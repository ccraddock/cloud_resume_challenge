import React, { useState } from 'react';
import ResumeViewer from './components/ResumeViewer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [selectedResume, setSelectedResume] = useState('ml');

  const resumeFiles = {
    ml: '/resumes/ml-resume.json',
    neuroscience: '/resumes/neuroscience-resume.json',
  };

  return (
    <div className="app">
      <Header selectedResume={selectedResume} onResumeChange={setSelectedResume} />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <ResumeViewer url={resumeFiles[selectedResume]} key={selectedResume} />
        </main>
      </div>
      <footer className="footer">
        <p>&copy; 2025 Cameron Craddock | Resume powered by React</p>
      </footer>
    </div>
  );
}

export default App;