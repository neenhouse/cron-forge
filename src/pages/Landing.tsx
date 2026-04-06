import { useNavigate } from 'react-router-dom';
import './Landing.css';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'Visual Cron Builder',
    description:
      'Build cron expressions with dropdowns and presets. See human-readable descriptions and next run times instantly.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
    title: 'Execution History',
    description:
      'Track every job run with status, duration, and output logs. Filter and sort to find what you need.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'Failure Alerts',
    description:
      'Get notified when jobs fail. See error details, severity levels, and retry with one click.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Schedule Visualization',
    description:
      'See all your jobs on a 24-hour timeline. Spot overlaps and optimize your schedule at a glance.',
  },
];

const steps = [
  {
    number: '1',
    title: 'Build your schedule',
    description: 'Use the visual builder or paste a cron expression. Pick from common presets to get started fast.',
  },
  {
    number: '2',
    title: 'Monitor executions',
    description: 'Watch your jobs run in real time. Review history, check logs, and track success rates.',
  },
  {
    number: '3',
    title: 'Stay informed',
    description: 'Get alerts on failures, visualize your schedule, and export configurations for your servers.',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="nav-brand">
            <svg className="nav-logo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="nav-logo">CronForge</span>
          </div>
          <button className="btn btn-sm btn-primary" onClick={() => navigate('/app')}>
            Open App
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main id="main-content">
      <header className="landing-hero">
        <div className="landing-hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Open Source Cron Platform
        </div>
        <h1 className="landing-hero-title">
          Build, monitor, and debug<br />
          <span className="accent-text">cron</span> jobs with confidence
        </h1>
        <p className="landing-hero-subtitle">
          CronForge gives you a visual cron builder, execution history, failure alerts,
          and schedule visualization — everything you need to manage scheduled tasks.
        </p>
        <div className="landing-hero-actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/app')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Get Started
          </button>
          <button className="btn btn-ghost btn-lg" onClick={() => navigate('/app')}>
            Try the Builder
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
        <div className="landing-hero-preview">
          <div className="preview-label">Example</div>
          <code className="cron-preview">0 9 * * 1-5</code>
          <span className="cron-desc">Every weekday at 9:00 AM</span>
        </div>
      </header>

      {/* Features */}
      <section className="landing-features">
        <div className="section-label">Features</div>
        <h2>Everything you need for cron management</h2>
        <p className="section-subtitle">
          From building expressions to monitoring executions, CronForge covers the full lifecycle of your scheduled jobs.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="landing-steps">
        <div className="section-label">How it works</div>
        <h2>Three steps to reliable scheduling</h2>
        <div className="steps-grid">
          {steps.map((s) => (
            <div key={s.number} className="step-card">
              <div className="step-number">{s.number}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="cta-glow" />
        <h2>Ready to tame your cron jobs?</h2>
        <p>Start building schedules visually. No account required.</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/app')}>
          Launch CronForge
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </section>

      </main>
      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-brand">
          <span className="footer-logo">CronForge</span>
          <span className="footer-tagline">Visual cron job management platform</span>
        </div>
        <div className="footer-right">
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://en.wikipedia.org/wiki/Cron" target="_blank" rel="noopener noreferrer">Docs</a>
            <a href="mailto:hello@cronforge.dev">Contact</a>
          </div>
          <span className="footer-copy">&copy; {new Date().getFullYear()} CronForge. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
