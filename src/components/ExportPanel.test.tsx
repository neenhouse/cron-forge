import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExportPanel from './ExportPanel';
import type { CronFields } from '../lib/cron';

const fields: CronFields = {
  minute: '0',
  hour: '9',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '1-5',
};

describe('ExportPanel', () => {
  it('renders the current expression', () => {
    render(<ExportPanel fields={fields} />);
    const matches = screen.getAllByText('0 9 * * 1-5');
    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(matches[0]).toBeInTheDocument();
  });

  it('shows crontab and JSON format toggles', () => {
    render(<ExportPanel fields={fields} />);
    expect(screen.getByText('Crontab')).toBeInTheDocument();
    expect(screen.getByText('JSON')).toBeInTheDocument();
  });

  it('renders the export output', () => {
    render(<ExportPanel fields={fields} />);
    const output = screen.getByTestId('export-output');
    expect(output.textContent).toContain('CronForge Export');
  });

  it('shows copy and download buttons', () => {
    render(<ExportPanel fields={fields} />);
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});
