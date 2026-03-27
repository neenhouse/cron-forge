/**
 * Mock data for CronForge demo.
 */

export type ExecutionStatus = 'success' | 'failed' | 'running';

export interface Execution {
  id: string;
  jobName: string;
  expression: string;
  status: ExecutionStatus;
  startTime: string;
  endTime: string | null;
  duration: number; // seconds
  exitCode: number | null;
  output: string;
}

export interface Alert {
  id: string;
  jobName: string;
  expression: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  resolved: boolean;
  exitCode: number;
  output: string;
}

export interface Job {
  id: string;
  name: string;
  expression: string;
  color: string;
  command: string;
}

export const MOCK_JOBS: Job[] = [
  { id: 'j1', name: 'DB Backup', expression: '0 2 * * *', color: '#06b6d4', command: '/usr/local/bin/backup-db.sh' },
  { id: 'j2', name: 'Log Rotation', expression: '0 0 * * *', color: '#10b981', command: '/usr/local/bin/rotate-logs.sh' },
  { id: 'j3', name: 'Health Check', expression: '*/5 * * * *', color: '#f59e0b', command: 'curl -f https://api.example.com/health' },
  { id: 'j4', name: 'Report Gen', expression: '0 9 * * 1-5', color: '#ef4444', command: '/opt/scripts/generate-report.py' },
  { id: 'j5', name: 'Cache Warm', expression: '*/15 * * * *', color: '#8b5cf6', command: '/usr/local/bin/warm-cache.sh' },
  { id: 'j6', name: 'Email Digest', expression: '0 8 * * 1', color: '#ec4899', command: '/opt/scripts/send-digest.py' },
];

export const MOCK_EXECUTIONS: Execution[] = [
  {
    id: 'e1',
    jobName: 'DB Backup',
    expression: '0 2 * * *',
    status: 'success',
    startTime: '2026-03-26T02:00:00Z',
    endTime: '2026-03-26T02:03:42Z',
    duration: 222,
    exitCode: 0,
    output: 'Backup completed successfully. 2.4GB written to s3://backups/db-20260326.sql.gz',
  },
  {
    id: 'e2',
    jobName: 'Health Check',
    expression: '*/5 * * * *',
    status: 'success',
    startTime: '2026-03-26T14:55:00Z',
    endTime: '2026-03-26T14:55:02Z',
    duration: 2,
    exitCode: 0,
    output: 'HTTP 200 OK - Response time: 142ms',
  },
  {
    id: 'e3',
    jobName: 'Report Gen',
    expression: '0 9 * * 1-5',
    status: 'failed',
    startTime: '2026-03-26T09:00:00Z',
    endTime: '2026-03-26T09:00:15Z',
    duration: 15,
    exitCode: 1,
    output: 'Error: Connection refused to database server at 10.0.1.5:5432\nTraceback (most recent call last):\n  File "/opt/scripts/generate-report.py", line 42\n    psycopg2.OperationalError: could not connect to server',
  },
  {
    id: 'e4',
    jobName: 'Log Rotation',
    expression: '0 0 * * *',
    status: 'success',
    startTime: '2026-03-26T00:00:00Z',
    endTime: '2026-03-26T00:00:08Z',
    duration: 8,
    exitCode: 0,
    output: 'Rotated 12 log files. Freed 890MB disk space.',
  },
  {
    id: 'e5',
    jobName: 'Cache Warm',
    expression: '*/15 * * * *',
    status: 'running',
    startTime: '2026-03-26T15:00:00Z',
    endTime: null,
    duration: 0,
    exitCode: null,
    output: 'Warming cache for /api/products... 342/500 endpoints processed',
  },
  {
    id: 'e6',
    jobName: 'DB Backup',
    expression: '0 2 * * *',
    status: 'success',
    startTime: '2026-03-25T02:00:00Z',
    endTime: '2026-03-25T02:04:11Z',
    duration: 251,
    exitCode: 0,
    output: 'Backup completed successfully. 2.3GB written to s3://backups/db-20260325.sql.gz',
  },
  {
    id: 'e7',
    jobName: 'Health Check',
    expression: '*/5 * * * *',
    status: 'failed',
    startTime: '2026-03-26T13:30:00Z',
    endTime: '2026-03-26T13:30:30Z',
    duration: 30,
    exitCode: 1,
    output: 'HTTP 503 Service Unavailable - Gateway timeout after 30s',
  },
  {
    id: 'e8',
    jobName: 'Email Digest',
    expression: '0 8 * * 1',
    status: 'success',
    startTime: '2026-03-24T08:00:00Z',
    endTime: '2026-03-24T08:01:22Z',
    duration: 82,
    exitCode: 0,
    output: 'Digest sent to 1,247 subscribers. Open rate: 34.2%',
  },
  {
    id: 'e9',
    jobName: 'Report Gen',
    expression: '0 9 * * 1-5',
    status: 'success',
    startTime: '2026-03-25T09:00:00Z',
    endTime: '2026-03-25T09:02:45Z',
    duration: 165,
    exitCode: 0,
    output: 'Daily report generated. 15 charts, 8 tables. PDF: /reports/daily-20260325.pdf',
  },
  {
    id: 'e10',
    jobName: 'Cache Warm',
    expression: '*/15 * * * *',
    status: 'success',
    startTime: '2026-03-26T14:45:00Z',
    endTime: '2026-03-26T14:46:12Z',
    duration: 72,
    exitCode: 0,
    output: 'Cache warmed successfully. 500/500 endpoints. Avg response: 45ms',
  },
  {
    id: 'e11',
    jobName: 'DB Backup',
    expression: '0 2 * * *',
    status: 'failed',
    startTime: '2026-03-24T02:00:00Z',
    endTime: '2026-03-24T02:00:05Z',
    duration: 5,
    exitCode: 2,
    output: 'Error: Insufficient disk space on /mnt/backup. Available: 120MB, Required: 2.4GB',
  },
  {
    id: 'e12',
    jobName: 'Health Check',
    expression: '*/5 * * * *',
    status: 'success',
    startTime: '2026-03-26T14:50:00Z',
    endTime: '2026-03-26T14:50:01Z',
    duration: 1,
    exitCode: 0,
    output: 'HTTP 200 OK - Response time: 89ms',
  },
  {
    id: 'e13',
    jobName: 'Log Rotation',
    expression: '0 0 * * *',
    status: 'success',
    startTime: '2026-03-25T00:00:00Z',
    endTime: '2026-03-25T00:00:06Z',
    duration: 6,
    exitCode: 0,
    output: 'Rotated 10 log files. Freed 720MB disk space.',
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    jobName: 'Report Gen',
    expression: '0 9 * * 1-5',
    severity: 'critical',
    message: 'Job has failed 3 consecutive times. Database connection refused.',
    timestamp: '2026-03-26T09:00:15Z',
    acknowledged: false,
    resolved: false,
    exitCode: 1,
    output: 'psycopg2.OperationalError: could not connect to server at 10.0.1.5:5432',
  },
  {
    id: 'a2',
    jobName: 'DB Backup',
    expression: '0 2 * * *',
    severity: 'warning',
    message: 'Backup failed due to insufficient disk space on backup volume.',
    timestamp: '2026-03-24T02:00:05Z',
    acknowledged: true,
    resolved: false,
    exitCode: 2,
    output: 'Insufficient disk space on /mnt/backup. Available: 120MB, Required: 2.4GB',
  },
  {
    id: 'a3',
    jobName: 'Health Check',
    expression: '*/5 * * * *',
    severity: 'info',
    message: 'Health check recovered after 1 failure. Service was briefly unavailable.',
    timestamp: '2026-03-26T13:35:00Z',
    acknowledged: false,
    resolved: true,
    exitCode: 0,
    output: 'Service recovered. Downtime: ~5 minutes (13:30 - 13:35 UTC)',
  },
  {
    id: 'a4',
    jobName: 'Cache Warm',
    expression: '*/15 * * * *',
    severity: 'warning',
    message: 'Cache warming exceeded timeout threshold (120s). Partial completion.',
    timestamp: '2026-03-26T12:15:00Z',
    acknowledged: false,
    resolved: false,
    exitCode: 124,
    output: 'Timeout: processed 312/500 endpoints before 120s limit. Consider increasing timeout.',
  },
  {
    id: 'a5',
    jobName: 'Email Digest',
    expression: '0 8 * * 1',
    severity: 'critical',
    message: 'SMTP authentication failed. Weekly digest not sent to 1,247 subscribers.',
    timestamp: '2026-03-17T08:00:30Z',
    acknowledged: true,
    resolved: true,
    exitCode: 1,
    output: 'smtplib.SMTPAuthenticationError: (535, "Authentication credentials invalid")',
  },
];
