import { useState, useMemo } from 'react';
import type { CronFields } from '../lib/cron';
import { fieldsToExpression, describeCron } from '../lib/cron';
import { MOCK_JOBS } from '../lib/mockData';
import './ExportPanel.css';

interface ExportPanelProps {
  fields: CronFields;
}

export default function ExportPanel({ fields }: ExportPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'crontab' | 'json'>('crontab');

  const currentExpression = fieldsToExpression(fields);

  const crontabOutput = useMemo(() => {
    const lines = [
      '# CronForge Export',
      `# Generated: ${new Date().toISOString()}`,
      '#',
      '# Format: minute hour day-of-month month day-of-week command',
      '',
      `# Current builder expression: ${describeCron(fields)}`,
      `${currentExpression} /path/to/your/command`,
      '',
      '# --- Saved Jobs ---',
      '',
    ];
    for (const job of MOCK_JOBS) {
      lines.push(`# ${job.name}`);
      lines.push(`${job.expression} ${job.command}`);
      lines.push('');
    }
    return lines.join('\n');
  }, [fields, currentExpression]);

  const jsonOutput = useMemo(() => {
    const data = {
      generated: new Date().toISOString(),
      builder: {
        expression: currentExpression,
        description: describeCron(fields),
        fields,
      },
      jobs: MOCK_JOBS.map((job) => ({
        name: job.name,
        expression: job.expression,
        command: job.command,
      })),
    };
    return JSON.stringify(data, null, 2);
  }, [fields, currentExpression]);

  const output = exportFormat === 'crontab' ? crontabOutput : jsonOutput;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(exportFormat);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(exportFormat);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const downloadFile = () => {
    const ext = exportFormat === 'crontab' ? 'txt' : 'json';
    const mime = exportFormat === 'crontab' ? 'text/plain' : 'application/json';
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cronforge-export.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-panel">
      <div className="export-header">
        <h2>Export</h2>
        <div className="export-format-toggle">
          <button
            className={`btn btn-sm ${exportFormat === 'crontab' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setExportFormat('crontab')}
          >
            Crontab
          </button>
          <button
            className={`btn btn-sm ${exportFormat === 'json' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setExportFormat('json')}
          >
            JSON
          </button>
        </div>
      </div>

      <div className="export-info card">
        <h3>Current Expression</h3>
        <div className="export-current">
          <code className="export-expr">{currentExpression}</code>
          <span className="export-desc">{describeCron(fields)}</span>
        </div>
      </div>

      <div className="export-output-section">
        <div className="export-output-header">
          <span className="export-output-label">
            {exportFormat === 'crontab' ? 'Crontab File' : 'JSON Export'}
          </span>
          <div className="export-actions">
            <button className="btn btn-sm btn-secondary" onClick={copyToClipboard} data-testid="copy-button">
              {copied === exportFormat ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button className="btn btn-sm btn-primary" onClick={downloadFile}>
              Download
            </button>
          </div>
        </div>
        <pre className="export-output" data-testid="export-output">
          <code>{output}</code>
        </pre>
      </div>

      <div className="export-jobs card">
        <h3>Included Jobs ({MOCK_JOBS.length})</h3>
        <div className="export-jobs-list">
          {MOCK_JOBS.map((job) => (
            <div key={job.id} className="export-job-row">
              <span className="export-job-name">{job.name}</span>
              <code>{job.expression}</code>
              <span className="export-job-cmd">{job.command}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
