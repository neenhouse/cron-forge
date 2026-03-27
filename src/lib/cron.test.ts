import { describe, it, expect } from 'vitest';
import {
  fieldsToExpression,
  expressionToFields,
  describeCron,
  validateCron,
  getNextRuns,
  DEFAULT_CRON,
} from './cron';
import type { CronFields } from './cron';

describe('fieldsToExpression', () => {
  it('converts default fields to "0 * * * *"', () => {
    expect(fieldsToExpression(DEFAULT_CRON)).toBe('0 * * * *');
  });

  it('converts all-star fields correctly', () => {
    const fields: CronFields = { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' };
    expect(fieldsToExpression(fields)).toBe('* * * * *');
  });
});

describe('expressionToFields', () => {
  it('parses a valid 5-field expression', () => {
    const result = expressionToFields('0 9 * * 1-5');
    expect(result).toEqual({
      minute: '0',
      hour: '9',
      dayOfMonth: '*',
      month: '*',
      dayOfWeek: '1-5',
    });
  });

  it('returns null for invalid expressions', () => {
    expect(expressionToFields('invalid')).toBeNull();
    expect(expressionToFields('* * *')).toBeNull();
    expect(expressionToFields('')).toBeNull();
  });
});

describe('describeCron', () => {
  it('describes every-minute pattern', () => {
    const fields: CronFields = { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' };
    expect(describeCron(fields)).toBe('Every minute');
  });

  it('describes a weekday 9 AM schedule', () => {
    const fields: CronFields = { minute: '0', hour: '9', dayOfMonth: '*', month: '*', dayOfWeek: '1-5' };
    expect(describeCron(fields)).toContain('9:00 AM');
    expect(describeCron(fields)).toContain('weekday');
  });

  it('describes an interval pattern', () => {
    const fields: CronFields = { minute: '*/15', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' };
    expect(describeCron(fields)).toContain('15 minutes');
  });
});

describe('validateCron', () => {
  it('returns null for valid expressions', () => {
    expect(validateCron(DEFAULT_CRON)).toBeNull();
    expect(validateCron({ minute: '*/5', hour: '9', dayOfMonth: '1', month: '12', dayOfWeek: '0' })).toBeNull();
  });

  it('reports invalid minute', () => {
    const fields: CronFields = { ...DEFAULT_CRON, minute: '60' };
    expect(validateCron(fields)).toContain('minute');
  });

  it('reports invalid hour', () => {
    const fields: CronFields = { ...DEFAULT_CRON, hour: '25' };
    expect(validateCron(fields)).toContain('hour');
  });

  it('reports invalid day of week', () => {
    const fields: CronFields = { ...DEFAULT_CRON, dayOfWeek: '8' };
    expect(validateCron(fields)).toContain('day of week');
  });
});

describe('getNextRuns', () => {
  it('returns the requested number of runs', () => {
    const fields: CronFields = { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' };
    const runs = getNextRuns(fields, 5);
    expect(runs).toHaveLength(5);
  });

  it('returns Date objects', () => {
    const fields: CronFields = { minute: '0', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' };
    const runs = getNextRuns(fields, 3);
    runs.forEach((r) => {
      expect(r).toBeInstanceOf(Date);
    });
  });

  it('produces runs in ascending order', () => {
    const fields: CronFields = { minute: '*/10', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' };
    const runs = getNextRuns(fields, 5);
    for (let i = 1; i < runs.length; i++) {
      expect(runs[i].getTime()).toBeGreaterThan(runs[i - 1].getTime());
    }
  });
});
