import React from 'react';
import './Sidebar.css';

function Sidebar() {
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