import React, { useEffect, useState } from 'react';
import './ResumeViewer.css';

function formatDate(dateStr) {
  if (!dateStr) return '';
  if (dateStr.toLowerCase() === 'present') return 'Present';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function TechnicalSkillsSection({ technicalSkills }) {
  return (
    <section>
      <h2 className="section-header">Technical Skills</h2>
      <div className="technical-skills">
        {technicalSkills.map((group, idx) => (
          <p key={idx} className="technical-skill-group">
            <strong>{group.category}:</strong> {group.skills}
          </p>
        ))}
      </div>
    </section>
  );
}

function JobSection({ jobs }) {
  return (
    <section>
      <h2 className="section-header">Professional Experience — Recent 10 Years of a 26-Year Career</h2>
      {jobs.map((job, idx) => (
        <div className="job-block" key={idx}>
          <div className="job-header">
            <div>
              <span className="job-company">{job.company}</span>
              {', '}
              <span className="job-position">{job.position}</span>
              {job.location ? <span className="job-location">, {job.location}</span> : null}
            </div>
            <div className="job-dates">
              {formatDate(job.startDate)} – {formatDate(job.endDate)}
            </div>
          </div>
          <div className="job-summary">{job.summary}</div>
          {job.highlights && job.highlights.length > 0 && (
            <ul className="job-highlights">
              {job.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}

function OpenScienceSection({ openScienceProjects }) {
  return (
    <section>
      <h2 className="section-header">Open Science & Community</h2>
      <ul className="open-science-list">
        {openScienceProjects.map((proj, i) => (
          <li key={i}>
            <span className="open-science-title">
              {proj.url ? <a href={proj.url} target="_blank" rel="noopener noreferrer">{proj.name}</a> : proj.name}
            </span>
            {proj.description ? <> — <span className="open-science-desc">{proj.description}</span></> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function GrantsAwardsSection({ grantsAwardsAndPublications }) {
  return (
    <section>
      <h2 className="section-header">Grants, Awards & Publications</h2>
      <div className="grants-pubs">
        <div>{grantsAwardsAndPublications.publications}</div>
        <div>{grantsAwardsAndPublications.invitedSpeaker}</div>
        <ul className="awards-list">
          {grantsAwardsAndPublications.awards &&
            grantsAwardsAndPublications.awards.map((award, i) => (
              <li key={i}>
                <span className="award-year">{award.year}:</span>{' '}
                <span className="award-title">{award.title}</span>
                {award.amount ? <> <span className="award-amount">({award.amount})</span></> : null}
                {award.description ? <> — <span className="award-desc">{award.description}</span></> : null}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default function ResumeViewer({ url }) {
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setStatus('loading');
    setError(null);

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP error: ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (mounted) {
          setResume(data);
          setStatus('ready');
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
          setStatus('error');
        }
      });

    return () => {
      mounted = false;
    };
  }, [url]);

  if (status === 'loading') {
    return (
      <div className="resume-container loading">
        <div className="loader"></div>
        <p>Loading your resume...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="resume-container error">
        <div className="error-icon">⚠️</div>
        <h2>Unable to Load Resume</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="resume-container ready">
      <article className="resume-content">
        <h1 className="resume-title">{resume.title}</h1>
        {resume.summary && <p className="resume-summary">{resume.summary}</p>}
        {resume.technicalSkills && <TechnicalSkillsSection technicalSkills={resume.technicalSkills} />}
        {resume.jobs && <JobSection jobs={resume.jobs} />}
        {resume.openScienceProjects && <OpenScienceSection openScienceProjects={resume.openScienceProjects} />}
        {resume.grantsAwardsAndPublications && <GrantsAwardsSection grantsAwardsAndPublications={resume.grantsAwardsAndPublications} />}
      </article>
    </div>
  );
}