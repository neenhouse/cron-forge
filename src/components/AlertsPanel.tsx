import { useState } from 'react';
import { MOCK_ALERTS } from '../lib/mockData';
import type { Alert } from '../lib/mockData';
import './AlertsPanel.css';

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

  const acknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    );
  };

  const resolve = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)),
    );
  };

  const retry = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, severity: 'info' as const, resolved: true, message: `Retry triggered. ${a.message}` } : a,
      ),
    );
  };

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const resolvedAlerts = alerts.filter((a) => a.resolved);

  return (
    <div className="alerts-panel">
      <div className="alerts-header">
        <h2>Failure Alerts</h2>
        <span className="alerts-count badge badge-danger">
          {activeAlerts.length} active
        </span>
      </div>

      {activeAlerts.length === 0 && (
        <div className="alerts-empty card">
          All clear! No active alerts.
        </div>
      )}

      <div className="alerts-list">
        {activeAlerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onAcknowledge={acknowledge}
            onResolve={resolve}
            onRetry={retry}
          />
        ))}
      </div>

      {resolvedAlerts.length > 0 && (
        <>
          <h3 className="resolved-heading">Resolved ({resolvedAlerts.length})</h3>
          <div className="alerts-list">
            {resolvedAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={acknowledge}
                onResolve={resolve}
                onRetry={retry}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface AlertCardProps {
  alert: Alert;
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
  onRetry: (id: string) => void;
}

function AlertCard({ alert, onAcknowledge, onResolve, onRetry }: AlertCardProps) {
  const severityClass: Record<string, string> = {
    critical: 'badge-danger',
    warning: 'badge-warning',
    info: 'badge-info',
  };

  const borderClass: Record<string, string> = {
    critical: 'alert-border-critical',
    warning: 'alert-border-warning',
    info: 'alert-border-info',
  };

  return (
    <div
      className={`alert-card card ${borderClass[alert.severity]} ${alert.resolved ? 'alert-resolved' : ''}`}
      data-testid="alert-card"
    >
      <div className="alert-card-header">
        <div className="alert-card-meta">
          <span className={`badge ${severityClass[alert.severity]}`}>{alert.severity}</span>
          <span className="alert-job-name">{alert.jobName}</span>
          <code className="alert-expr">{alert.expression}</code>
        </div>
        <span className="alert-time">
          {new Date(alert.timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </span>
      </div>
      <p className="alert-message">{alert.message}</p>
      <div className="alert-output">
        <code>{alert.output}</code>
      </div>
      <div className="alert-card-footer">
        <span className="alert-exit">Exit code: {alert.exitCode}</span>
        {!alert.resolved && (
          <div className="alert-actions">
            {!alert.acknowledged && (
              <button className="btn btn-sm btn-secondary" onClick={() => onAcknowledge(alert.id)}>
                Acknowledge
              </button>
            )}
            <button className="btn btn-sm btn-secondary" onClick={() => onResolve(alert.id)}>
              Resolve
            </button>
            <button className="btn btn-sm btn-primary" onClick={() => onRetry(alert.id)}>
              Retry
            </button>
          </div>
        )}
        {alert.resolved && (
          <span className="badge badge-success">Resolved</span>
        )}
      </div>
    </div>
  );
}
