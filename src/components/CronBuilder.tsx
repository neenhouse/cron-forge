import { useState, useMemo, useCallback } from 'react';
import type { CronFields } from '../lib/cron';
import {
  fieldsToExpression,
  expressionToFields,
  describeCron,
  validateCron,
  getNextRuns,
  PRESETS,
} from '../lib/cron';
import './CronBuilder.css';

interface CronBuilderProps {
  fields: CronFields;
  onChange: (fields: CronFields) => void;
}

const MINUTE_OPTIONS = ['*', '*/5', '*/10', '*/15', '*/30', ...Array.from({ length: 60 }, (_, i) => String(i))];
const HOUR_OPTIONS = ['*', '*/2', '*/3', '*/4', '*/6', '*/12', ...Array.from({ length: 24 }, (_, i) => String(i))];
const DOM_OPTIONS = ['*', ...Array.from({ length: 31 }, (_, i) => String(i + 1))];
const MONTH_OPTIONS = ['*', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const DOW_OPTIONS = ['*', '0', '1', '2', '3', '4', '5', '6', '1-5', '0,6'];

const MONTH_LABELS: Record<string, string> = {
  '*': 'Every month', '1': 'January', '2': 'February', '3': 'March',
  '4': 'April', '5': 'May', '6': 'June', '7': 'July',
  '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December',
};

const DOW_LABELS: Record<string, string> = {
  '*': 'Every day', '0': 'Sunday', '1': 'Monday', '2': 'Tuesday',
  '3': 'Wednesday', '4': 'Thursday', '5': 'Friday', '6': 'Saturday',
  '1-5': 'Weekdays (Mon-Fri)', '0,6': 'Weekends (Sat-Sun)',
};

function formatDateTime(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function CronBuilder({ fields, onChange }: CronBuilderProps) {
  const [rawInput, setRawInput] = useState(fieldsToExpression(fields));

  const expression = fieldsToExpression(fields);
  const description = describeCron(fields);
  const error = validateCron(fields);
  const nextRuns = useMemo(() => (error ? [] : getNextRuns(fields, 5)), [fields, error]);

  const updateField = useCallback(
    (key: keyof CronFields, value: string) => {
      const updated = { ...fields, [key]: value };
      onChange(updated);
      setRawInput(fieldsToExpression(updated));
    },
    [fields, onChange],
  );

  const handleRawChange = useCallback(
    (value: string) => {
      setRawInput(value);
      const parsed = expressionToFields(value);
      if (parsed) {
        onChange(parsed);
      }
    },
    [onChange],
  );

  const applyPreset = useCallback(
    (expr: string) => {
      const parsed = expressionToFields(expr);
      if (parsed) {
        onChange(parsed);
        setRawInput(expr);
      }
    },
    [onChange],
  );

  return (
    <div className="cron-builder">
      <div className="builder-main">
        {/* Raw expression input */}
        <div className="builder-section">
          <label className="builder-label">Cron Expression</label>
          <div className="raw-input-row">
            <input
              type="text"
              className="raw-input"
              value={rawInput}
              onChange={(e) => handleRawChange(e.target.value)}
              placeholder="* * * * *"
              spellCheck={false}
              aria-label="Cron expression"
            />
          </div>
          {error && <div className="builder-error">{error}</div>}
        </div>

        {/* Field selectors */}
        <div className="builder-section">
          <label className="builder-label">Fields</label>
          <div className="fields-grid">
            <FieldSelect
              label="Minute"
              value={fields.minute}
              options={MINUTE_OPTIONS}
              onChange={(v) => updateField('minute', v)}
            />
            <FieldSelect
              label="Hour"
              value={fields.hour}
              options={HOUR_OPTIONS}
              onChange={(v) => updateField('hour', v)}
            />
            <FieldSelect
              label="Day of Month"
              value={fields.dayOfMonth}
              options={DOM_OPTIONS}
              onChange={(v) => updateField('dayOfMonth', v)}
            />
            <FieldSelect
              label="Month"
              value={fields.month}
              options={MONTH_OPTIONS}
              labelMap={MONTH_LABELS}
              onChange={(v) => updateField('month', v)}
            />
            <FieldSelect
              label="Day of Week"
              value={fields.dayOfWeek}
              options={DOW_OPTIONS}
              labelMap={DOW_LABELS}
              onChange={(v) => updateField('dayOfWeek', v)}
            />
          </div>
        </div>

        {/* Human-readable description */}
        <div className="builder-section">
          <label className="builder-label">Description</label>
          <div className="description-box">
            <span className="description-text">{description}</span>
            <code className="description-expr">{expression}</code>
          </div>
        </div>

        {/* Next runs */}
        <div className="builder-section">
          <label className="builder-label">Next 5 Runs</label>
          <div className="next-runs">
            {nextRuns.length === 0 ? (
              <div className="next-run-empty">Fix the expression to see upcoming runs</div>
            ) : (
              nextRuns.map((date, i) => (
                <div key={i} className="next-run-item">
                  <span className="next-run-index">{i + 1}</span>
                  <span className="next-run-time">{formatDateTime(date)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Presets sidebar */}
      <div className="builder-sidebar">
        <label className="builder-label">Presets</label>
        <div className="presets-list">
          {PRESETS.map((preset) => (
            <button
              key={preset.expression}
              className={`preset-btn ${expression === preset.expression ? 'preset-active' : ''}`}
              onClick={() => applyPreset(preset.expression)}
            >
              <span className="preset-label">{preset.label}</span>
              <code className="preset-expr">{preset.expression}</code>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FieldSelectProps {
  label: string;
  value: string;
  options: string[];
  labelMap?: Record<string, string>;
  onChange: (value: string) => void;
}

function FieldSelect({ label, value, options, labelMap, onChange }: FieldSelectProps) {
  return (
    <div className="field-select">
      <span className="field-label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {labelMap?.[opt] ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
