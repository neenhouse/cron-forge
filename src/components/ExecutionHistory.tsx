import { useState, useMemo } from 'react';
import { MOCK_EXECUTIONS } from '../lib/mockData';
import type { ExecutionStatus } from '../lib/mockData';
import './ExecutionHistory.css';

type SortKey = 'jobName' | 'startTime' | 'duration' | 'status';
type SortDir = 'asc' | 'desc';

function formatDuration(seconds: number): string {
  if (seconds === 0) return '...';
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

function statusBadge(status: ExecutionStatus) {
  const classMap: Record<ExecutionStatus, string> = {
    success: 'badge badge-success',
    failed: 'badge badge-danger',
    running: 'badge badge-running',
  };
  return <span className={classMap[status]}>{status}</span>;
}

export default function ExecutionHistory() {
  const [filter, setFilter] = useState<ExecutionStatus | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('startTime');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const filtered = useMemo(() => {
    let rows = [...MOCK_EXECUTIONS];
    if (filter !== 'all') {
      rows = rows.filter((e) => e.status === filter);
    }
    rows.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'jobName') cmp = a.jobName.localeCompare(b.jobName);
      else if (sortKey === 'startTime') cmp = a.startTime.localeCompare(b.startTime);
      else if (sortKey === 'duration') cmp = a.duration - b.duration;
      else if (sortKey === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return rows;
  }, [filter, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return '';
    return sortDir === 'asc' ? ' \u2191' : ' \u2193';
  };

  return (
    <div className="execution-history">
      <div className="history-header">
        <h2>Execution History</h2>
        <div className="history-filters">
          {(['all', 'success', 'failed', 'running'] as const).map((s) => (
            <button
              key={s}
              className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(s)}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="history-table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => handleSort('jobName')}>
                Job{sortIndicator('jobName')}
              </th>
              <th>Expression</th>
              <th className="sortable" onClick={() => handleSort('status')}>
                Status{sortIndicator('status')}
              </th>
              <th className="sortable" onClick={() => handleSort('startTime')}>
                Started{sortIndicator('startTime')}
              </th>
              <th className="sortable" onClick={() => handleSort('duration')}>
                Duration{sortIndicator('duration')}
              </th>
              <th>Exit Code</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((exec) => (
              <tr key={exec.id} data-testid="execution-row">
                <td className="cell-name">{exec.jobName}</td>
                <td><code>{exec.expression}</code></td>
                <td>{statusBadge(exec.status)}</td>
                <td className="cell-time">{formatTime(exec.startTime)}</td>
                <td className="cell-mono">{formatDuration(exec.duration)}</td>
                <td className="cell-mono">{exec.exitCode ?? '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="history-footer">
        Showing {filtered.length} of {MOCK_EXECUTIONS.length} executions
      </div>
    </div>
  );
}
