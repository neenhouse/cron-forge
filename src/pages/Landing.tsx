import { useNavigate } from 'react-router-dom';
import './Landing.css';

const features = [
  {
    icon: '\u2699\ufe0f',
    title: 'Visual Cron Builder',
    description:
      'Build cron expressions with dropdowns and presets. See human-readable descriptions and next run times instantly.',
  },
  {
    icon: '\ud83d\udcca',
    title: 'Execution History',
    description:
      'Track every job run with status, duration, and output logs. Filter and sort to find what you need.',
  },
  {
    icon: '\ud83d\udea8',
    title: 'Failure Alerts',
    description:
      'Get notified when jobs fail. See error details, severity levels, and retry with one click.',
  },
  {
    icon: '\ud83d\udcc5',
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
      {/* Hero */}
      <header className="landing-hero">
        <div className="landing-hero-badge">Open Source Cron Platform</div>
        <h1 className="landing-hero-title">
          Build, monitor, and debug<br />
          <span className="accent-text">scheduled tasks</span>
        </h1>
        <p className="landing-hero-subtitle">
          CronForge gives you a visual cron builder, execution history, failure alerts,
          and schedule visualization — everything you need to manage cron jobs with confidence.
        </p>
        <div className="landing-hero-actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/app')}>
            Get Started
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('/app')}>
            Try the Builder
          </button>
        </div>
        <div className="landing-hero-preview">
          <code className="cron-preview">0 9 * * 1-5</code>
          <span className="cron-desc">Every weekday at 9:00 AM</span>
        </div>
      </header>

      {/* Features */}
      <section className="landing-features">
        <h2>Everything you need for cron management</h2>
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
        <h2>How it works</h2>
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
        <h2>Ready to tame your cron jobs?</h2>
        <p>Start building schedules visually. No account required.</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/app')}>
          Launch CronForge
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-brand">
          <span className="footer-logo">CronForge</span>
          <span className="footer-tagline">Visual cron job platform</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://en.wikipedia.org/wiki/Cron" target="_blank" rel="noopener noreferrer">Docs</a>
          <a href="mailto:hello@cronforge.dev">Contact</a>
        </div>
      </footer>
    </div>
  );
}
