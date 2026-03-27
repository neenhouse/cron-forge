import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CronBuilder from './CronBuilder';
import type { CronFields } from '../lib/cron';

const defaultFields: CronFields = {
  minute: '0',
  hour: '*',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '*',
};

describe('CronBuilder', () => {
  it('renders the raw expression input', () => {
    render(<CronBuilder fields={defaultFields} onChange={() => {}} />);
    const input = screen.getByLabelText('Cron expression') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('0 * * * *');
  });

  it('renders all field selectors', () => {
    render(<CronBuilder fields={defaultFields} onChange={() => {}} />);
    expect(screen.getByLabelText('Minute')).toBeInTheDocument();
    expect(screen.getByLabelText('Hour')).toBeInTheDocument();
    expect(screen.getByLabelText('Day of Month')).toBeInTheDocument();
    expect(screen.getByLabelText('Month')).toBeInTheDocument();
    expect(screen.getByLabelText('Day of Week')).toBeInTheDocument();
  });

  it('calls onChange when a field selector changes', () => {
    const onChange = vi.fn();
    render(<CronBuilder fields={defaultFields} onChange={onChange} />);
    const minuteSelect = screen.getByLabelText('Minute');
    fireEvent.change(minuteSelect, { target: { value: '30' } });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ minute: '30' }),
    );
  });

  it('shows next runs section', () => {
    render(<CronBuilder fields={defaultFields} onChange={() => {}} />);
    expect(screen.getByText('Next 5 Runs')).toBeInTheDocument();
  });

  it('renders preset buttons', () => {
    render(<CronBuilder fields={defaultFields} onChange={() => {}} />);
    expect(screen.getByText('Every minute')).toBeInTheDocument();
    expect(screen.getByText('Daily at midnight')).toBeInTheDocument();
    expect(screen.getByText('Weekly on Monday')).toBeInTheDocument();
  });
});
