import React from 'react';
import './Sidebar.css';

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="sidebar-link">
      {children}
    </a>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Contact and education">
      <section className="sidebar-section">
        <h2>Contact</h2>
        <div className="contact-list">
          <span>Austin, Texas</span>
          <a href="tel:+14046254973">(404) 625-4973</a>
          <a href="mailto:cameron.craddock@gmail.com">cameron.craddock@gmail.com</a>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>Profiles</h2>
        <nav className="profile-links" aria-label="Professional profiles">
          <ExternalLink href="https://www.linkedin.com/in/cameron-craddock/">LinkedIn</ExternalLink>
          <ExternalLink href="https://github.com/ccraddock">GitHub</ExternalLink>
          <ExternalLink href="https://tinyurl.com/CameronCraddockCitations">Google Scholar</ExternalLink>
        </nav>
      </section>

      <section className="sidebar-section education-section">
        <h2>Education</h2>
        <div className="edu-item">
          <h3>Georgia Institute of Technology</h3>
          <p>PhD, Electrical &amp; Computer Engineering</p>
          <span>2009</span>
        </div>
        <div className="edu-item compact">
          <p>MS, Electrical &amp; Computer Engineering</p>
          <span>2002</span>
        </div>
        <div className="edu-item compact">
          <p>BS, Computer Engineering</p>
          <span>1999</span>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
