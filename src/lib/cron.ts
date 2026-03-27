/**
 * Cron expression utilities for CronForge.
 * Supports standard 5-field cron: minute hour day-of-month month day-of-week
 */

export interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export const DEFAULT_CRON: CronFields = {
  minute: '0',
  hour: '*',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '*',
};

export interface CronPreset {
  label: string;
  expression: string;
  description: string;
}

export const PRESETS: CronPreset[] = [
  { label: 'Every minute', expression: '* * * * *', description: 'Runs every minute' },
  { label: 'Every 5 minutes', expression: '*/5 * * * *', description: 'Runs every 5 minutes' },
  { label: 'Every hour', expression: '0 * * * *', description: 'Runs at the start of every hour' },
  { label: 'Daily at midnight', expression: '0 0 * * *', description: 'Runs once a day at midnight' },
  { label: 'Daily at 9 AM', expression: '0 9 * * *', description: 'Runs every day at 9:00 AM' },
  { label: 'Weekly on Monday', expression: '0 0 * * 1', description: 'Runs every Monday at midnight' },
  { label: 'Monthly (1st)', expression: '0 0 1 * *', description: 'Runs on the 1st of every month at midnight' },
  { label: 'Weekdays at 9 AM', expression: '0 9 * * 1-5', description: 'Runs every weekday at 9:00 AM' },
];

export function fieldsToExpression(fields: CronFields): string {
  return `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
}

export function expressionToFields(expr: string): CronFields | null {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function describeField(value: string, fieldName: string): string {
  if (value === '*') return `every ${fieldName}`;
  if (value.startsWith('*/')) {
    const interval = value.slice(2);
    return `every ${interval} ${fieldName}${Number(interval) > 1 ? 's' : ''}`;
  }
  if (value.includes(',')) {
    return `${fieldName} ${value}`;
  }
  if (value.includes('-')) {
    const [start, end] = value.split('-');
    if (fieldName === 'day-of-week') {
      const s = DAY_NAMES[Number(start)] || start;
      const e = DAY_NAMES[Number(end)] || end;
      return `${s} through ${e}`;
    }
    return `${fieldName} ${start} through ${end}`;
  }
  if (fieldName === 'month' && Number(value) >= 1 && Number(value) <= 12) {
    return MONTH_NAMES[Number(value)];
  }
  if (fieldName === 'day-of-week' && Number(value) >= 0 && Number(value) <= 6) {
    return DAY_NAMES[Number(value)];
  }
  return `${fieldName} ${value}`;
}

export function describeCron(fields: CronFields): string {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = fields;

  // Special common cases
  if (minute === '*' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    return 'Every minute';
  }

  const parts: string[] = [];

  // Time description
  if (minute.startsWith('*/')) {
    parts.push(`Every ${minute.slice(2)} minutes`);
  } else if (hour === '*' && minute !== '*') {
    parts.push(`At minute ${minute} of every hour`);
  } else if (hour !== '*' && minute !== '*') {
    const h = Number(hour);
    const m = Number(minute);
    if (!isNaN(h) && !isNaN(m)) {
      const period = h >= 12 ? 'PM' : 'AM';
      const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      parts.push(`At ${displayHour}:${String(m).padStart(2, '0')} ${period}`);
    } else {
      parts.push(`At ${hour}:${String(minute).padStart(2, '0')}`);
    }
  } else if (minute === '*' && hour !== '*') {
    parts.push(`Every minute during hour ${hour}`);
  }

  // Day-of-week
  if (dayOfWeek !== '*') {
    if (dayOfWeek === '1-5') {
      parts.push('on weekdays');
    } else if (dayOfWeek === '0,6') {
      parts.push('on weekends');
    } else {
      parts.push(`on ${describeField(dayOfWeek, 'day-of-week')}`);
    }
  }

  // Day-of-month
  if (dayOfMonth !== '*') {
    parts.push(`on day ${dayOfMonth} of the month`);
  }

  // Month
  if (month !== '*') {
    parts.push(`in ${describeField(month, 'month')}`);
  }

  return parts.join(' ') || 'Custom schedule';
}

/**
 * Validate a single cron field value.
 */
function isValidField(value: string, min: number, max: number): boolean {
  if (value === '*') return true;
  if (/^\*\/\d+$/.test(value)) {
    const step = Number(value.slice(2));
    return step >= 1 && step <= max;
  }

  const parts = value.split(',');
  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (isNaN(start) || isNaN(end) || start < min || end > max || start > end) return false;
    } else {
      const num = Number(part);
      if (isNaN(num) || num < min || num > max) return false;
    }
  }
  return true;
}

export function validateCron(fields: CronFields): string | null {
  if (!isValidField(fields.minute, 0, 59)) return 'Invalid minute (0-59)';
  if (!isValidField(fields.hour, 0, 23)) return 'Invalid hour (0-23)';
  if (!isValidField(fields.dayOfMonth, 1, 31)) return 'Invalid day of month (1-31)';
  if (!isValidField(fields.month, 1, 12)) return 'Invalid month (1-12)';
  if (!isValidField(fields.dayOfWeek, 0, 6)) return 'Invalid day of week (0-6, Sun=0)';
  return null;
}

/**
 * Compute the next N run times for a cron expression.
 * Simplified implementation for common patterns.
 */
export function getNextRuns(fields: CronFields, count: number = 5, from?: Date): Date[] {
  const runs: Date[] = [];
  const start = from ? new Date(from) : new Date();
  start.setSeconds(0, 0);
  const cursor = new Date(start.getTime() + 60000); // Start from next minute

  const maxIterations = 525960; // ~1 year of minutes
  let iterations = 0;

  while (runs.length < count && iterations < maxIterations) {
    if (matchesCron(fields, cursor)) {
      runs.push(new Date(cursor));
    }
    cursor.setMinutes(cursor.getMinutes() + 1);
    iterations++;
  }

  return runs;
}

function matchesCron(fields: CronFields, date: Date): boolean {
  return (
    matchesField(fields.minute, date.getMinutes(), 0, 59) &&
    matchesField(fields.hour, date.getHours(), 0, 23) &&
    matchesField(fields.dayOfMonth, date.getDate(), 1, 31) &&
    matchesField(fields.month, date.getMonth() + 1, 1, 12) &&
    matchesField(fields.dayOfWeek, date.getDay(), 0, 6)
  );
}

function matchesField(pattern: string, value: number, _min: number, _max: number): boolean {
  if (pattern === '*') return true;
  if (pattern.startsWith('*/')) {
    const step = Number(pattern.slice(2));
    return value % step === 0;
  }
  const parts = pattern.split(',');
  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (value >= start && value <= end) return true;
    } else {
      if (Number(part) === value) return true;
    }
  }
  return false;
}
