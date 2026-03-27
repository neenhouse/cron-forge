import { useMemo } from 'react';
import type { Job } from '../lib/mockData';
import { expressionToFields, getNextRuns } from '../lib/cron';
import './ScheduleViz.css';

interface ScheduleVizProps {
  jobs: Job[];
}

interface RunSlot {
  job: Job;
  hour: number;
  minute: number;
}

export default function ScheduleViz({ jobs }: ScheduleVizProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const slots = useMemo(() => {
    const result: RunSlot[] = [];
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    for (const job of jobs) {
      const fields = expressionToFields(job.expression);
      if (!fields) continue;

      // Get runs for the next 24 hours starting from start of today
      const runs = getNextRuns(fields, 48, startOfDay);
      for (const run of runs) {
        if (run >= endOfDay) break;
        result.push({
          job,
          hour: run.getHours(),
          minute: run.getMinutes(),
        });
      }
    }
    return result;
  }, [jobs]);

  const slotsByHour = useMemo(() => {
    const map = new Map<number, RunSlot[]>();
    for (const slot of slots) {
      const existing = map.get(slot.hour) || [];
      existing.push(slot);
      map.set(slot.hour, existing);
    }
    return map;
  }, [slots]);

  return (
    <div className="schedule-viz">
      <div className="schedule-header">
        <h2>24-Hour Schedule</h2>
        <div className="schedule-legend">
          {jobs.map((job) => (
            <div key={job.id} className="legend-item">
              <span className="legend-dot" style={{ background: job.color }} />
              <span className="legend-label">{job.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline">
          {hours.map((hour) => {
            const hourSlots = slotsByHour.get(hour) || [];
            const hasOverlap = hourSlots.length > 1;
            return (
              <div key={hour} className="timeline-hour" data-testid="timeline-hour">
                <div className="hour-label">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
                <div className={`hour-track ${hasOverlap ? 'hour-overlap' : ''}`}>
                  {hourSlots.map((slot, i) => (
                    <div
                      key={`${slot.job.id}-${i}`}
                      className="run-marker"
                      style={{
                        backgroundColor: slot.job.color,
                        left: `${(slot.minute / 60) * 100}%`,
                      }}
                      title={`${slot.job.name} at ${String(slot.hour).padStart(2, '0')}:${String(slot.minute).padStart(2, '0')}`}
                    />
                  ))}
                  {hasOverlap && (
                    <div className="overlap-indicator" title={`${hourSlots.length} jobs overlap`}>
                      {hourSlots.length}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="schedule-summary card">
        <h3>Summary</h3>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-value">{jobs.length}</span>
            <span className="stat-label">Active Jobs</span>
          </div>
          <div className="stat">
            <span className="stat-value">{slots.length}</span>
            <span className="stat-label">Runs Today</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {Array.from(slotsByHour.values()).filter((s) => s.length > 1).length}
            </span>
            <span className="stat-label">Overlap Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}
