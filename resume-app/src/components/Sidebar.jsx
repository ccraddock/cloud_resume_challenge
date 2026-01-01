import React from 'react';
import './Sidebar.css';

function Sidebar() {
  const skills = [
    'PyTorch',
    'Python',
    'C/C++',
    'Matlab',
    'R',
    'BASH',
    'Pandas',
    'Supervised Machine Learning',
    'Unsupervised Machine Learning',
    'Data Science',
    'Multivariate Statistics',
    'Monte Carlo Methods',
    'Digitial Signal Processing', 
    'Image Processing',
    'Embedded Systems',
    'HPC Clusters',
    'Cloud Computing',
    'Mobile Applications',
    'Containers',
    'CI/CD',
    'Version Control',
    'Real-time OS',
    'Linux',
    'Networking',
    'Biomedical Research',
    'Electromyogram (EMG)',
    'Medical Imaging (MRI, fMRI, PET, DICOM)',
    'Brain Computer Interfaces',
    'Neural Processing Units (ARM Ethos)',
    'MR Physics',
    'MR Sequence Development and Optimization',
  ];

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <h3>Links</h3>
        <div className="links-grid">
          <a href="mailto:cameron.craddock@gmail.com" className="sidebar-link">
            📧 Email
          </a>
          <a
            href="https://www.linkedin.com/in/cameron-craddock/"
            target="_blank"
            rel="noreferrer"
            className="sidebar-link"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/ccraddock"
            target="_blank"
            rel="noreferrer"
            className="sidebar-link"
          >
            🔗 GitHub
          </a>
          <a
            href="https://scholar.google.com/citations?user=YOUR_ID"
            target="_blank"
            rel="noreferrer"
            className="sidebar-link"
          >
            🎓 Google Scholar
          </a>
        </div>
      </section>

      <section className="sidebar-section">
        <h3>Quick Info</h3>
        <p className="info-item">
          <span className="label">Location:</span> Austin, TX
        </p>
        <p className="info-item">
          <span className="label">Phone:</span> (404) 625-4973
        </p>
      </section>

      <section className="sidebar-section">
        <h3>Tech Skills</h3>
        <div className="skills-grid">
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="sidebar-section">
        <h3>Education</h3>
        <div className="edu-item">
          <h4>PhD Electrical & Computer Engineering</h4>
          <p>Georgia Tech • 2009</p>
        </div>
        <div className="edu-item">
          <h4>MS Electrical & Computer Engineering</h4>
          <p>Georgia Tech • 2002</p>
        </div>
        <div className="edu-item">
          <h4>BS Computer Engineering</h4>
          <p>Georgia Tech • 1999</p>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;