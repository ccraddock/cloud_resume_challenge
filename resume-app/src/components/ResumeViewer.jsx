import React, { useEffect, useState } from 'react';
import './ResumeViewer.css';

const METRIC_PATTERN = /((?:approximately\s+)?\d+(?:\.\d+)?\s*(?:%|ms|hours?|kHz)|less than\s+\d+(?:\.\d+)?\s*ms|up to\s+\d+(?:\.\d+)?%)/gi;
const METRIC_EXACT = /^(?:(?:approximately\s+)?\d+(?:\.\d+)?\s*(?:%|ms|hours?|kHz)|less than\s+\d+(?:\.\d+)?\s*ms|up to\s+\d+(?:\.\d+)?%)$/i;

function formatDate(dateStr) {
  if (!dateStr) return '';
  if (dateStr.toLowerCase() === 'present') return 'Present';

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function safeHttpUrl(url) {
  if (typeof url !== 'string' || !url) return '';

  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : '';
  } catch {
    return '';
  }
}

function emphasizeMetrics(text) {
  return String(text)
    .split(METRIC_PATTERN)
    .filter(Boolean)
    .map((part, index) =>
      METRIC_EXACT.test(part) ? (
        <strong className="metric" key={`${part}-${index}`}>{part}</strong>
      ) : (
        <React.Fragment key={`${index}-${part.slice(0, 12)}`}>{part}</React.Fragment>
      )
    );
}

function SectionHeader({ children }) {
  return <h2 className="section-header">{children}</h2>;
}

function TechnicalSkillsSection({ technicalSkills }) {
  return (
    <section className="resume-section">
      <SectionHeader>Technical Skills</SectionHeader>
      <div className="technical-skills">
        {technicalSkills.map((group, index) => (
          <div key={index} className="technical-skill-group">
            <h3>{group.category}</h3>
            <p>{group.skills}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function JobSection({ jobs, heading }) {
  return (
    <section className="resume-section">
      <SectionHeader>{heading}</SectionHeader>
      <div className="jobs-list">
        {jobs.map((job, index) => (
          <article className="job-block" key={`${job.company}-${index}`}>
            <div className="job-topline">
              <h3 className="job-company">{job.company}</h3>
              <div className="job-dates">
                {formatDate(job.startDate)} – {formatDate(job.endDate)}
              </div>
            </div>
            <div className="job-role-line">
              <span className="job-position">{job.position}</span>
              {job.location ? <span className="job-location"> · {job.location}</span> : null}
            </div>
            {job.summary && <p className="job-summary">{job.summary}</p>}
            {job.highlights?.length > 0 && (
              <ul className="job-highlights">
                {job.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex}>{emphasizeMetrics(highlight)}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function OpenScienceSection({ openScienceProjects }) {
  return (
    <section className="resume-section">
      <SectionHeader>Open Science &amp; Community</SectionHeader>
      <ul className="open-science-list">
        {openScienceProjects.map((project, index) => {
          const safeUrl = safeHttpUrl(project.url);
          return (
            <li key={`${project.name}-${index}`}>
              <span className="open-science-title">
                {safeUrl ? (
                  <a href={safeUrl} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </span>
              {project.description ? (
                <> — <span className="open-science-desc">{project.description}</span></>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function GrantsAwardsSection({ grantsAwardsAndPublications }) {
  return (
    <section className="resume-section">
      <SectionHeader>Grants, Awards &amp; Publications</SectionHeader>
      <div className="grants-pubs">
        <p>{grantsAwardsAndPublications.publications}</p>
        <p>{grantsAwardsAndPublications.invitedSpeaker}</p>
        <ul className="awards-list">
          {grantsAwardsAndPublications.awards?.map((award, index) => (
            <li key={`${award.year}-${award.title}-${index}`}>
              <span className="award-year">{award.year}</span>
              <span className="award-title">{award.title}</span>
              {award.amount ? <span className="award-amount">{award.amount}</span> : null}
              {award.description ? <span className="award-desc">{award.description}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function ResumeViewer({ url, experienceHeading = 'Professional Experience' }) {
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let mounted = true;
    setStatus('loading');

    fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw new Error('Resume request failed');
        return response.json();
      })
      .then((data) => {
        if (mounted) {
          setResume(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (mounted) setStatus('error');
      });

    return () => {
      mounted = false;
    };
  }, [url]);

  if (status === 'loading') {
    return (
      <div className="resume-container loading" role="status" aria-live="polite">
        <div className="loader" aria-hidden="true" />
        <p>Loading resume…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="resume-container error" role="alert">
        <h2>Unable to load resume</h2>
        <p>The resume data could not be loaded. Please refresh the page and try again.</p>
        <button type="button" onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="resume-container ready">
      <article className="resume-content">
        <header className="resume-intro">
          <p className="resume-eyebrow">Resume</p>
          <h1 className="resume-title">{resume.title}</h1>
          {resume.summary && <p className="resume-summary">{resume.summary}</p>}
        </header>

        {resume.technicalSkills && <TechnicalSkillsSection technicalSkills={resume.technicalSkills} />}
        {resume.jobs && <JobSection jobs={resume.jobs} heading={experienceHeading} />}
        {resume.openScienceProjects && <OpenScienceSection openScienceProjects={resume.openScienceProjects} />}
        {resume.grantsAwardsAndPublications && (
          <GrantsAwardsSection grantsAwardsAndPublications={resume.grantsAwardsAndPublications} />
        )}
      </article>
    </div>
  );
}
