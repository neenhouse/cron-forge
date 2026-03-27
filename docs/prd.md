# CronForge Product Requirements

## Overview

CronForge is a visual cron job platform with execution history, failure alerts, and team collaboration. This document defines the six core features for the initial release.

---

## Feature 1: Landing Page

### Goal
Communicate CronForge's value proposition and convert visitors into users.

### Requirements
- **Hero section**: Headline, subheadline, and a primary CTA ("Get Started" / "Try the Builder").
- **Feature highlights**: Three to four cards summarizing core capabilities (visual builder, execution history, alerts, collaboration).
- **Live demo embed**: An interactive cron builder widget embedded directly on the landing page so visitors can try before signing up.
- **Social proof section**: Placeholder for testimonials or usage stats.
- **Footer**: Links to docs, GitHub, and contact.

### Acceptance Criteria
- Page loads in under 2 seconds on a 3G connection.
- Hero CTA scrolls to or navigates to the cron builder.
- Responsive across mobile, tablet, and desktop breakpoints.

---

## Feature 2: Cron Builder UI

### Goal
Let users visually construct and validate cron expressions without memorizing syntax.

### Requirements
- **Field selectors**: Dropdowns or input controls for minute, hour, day-of-month, month, and day-of-week.
- **Human-readable preview**: Real-time translation of the expression (e.g., "Every weekday at 9:00 AM").
- **Next-run preview**: Show the next 5 scheduled execution times based on the current expression.
- **Raw expression input**: Users can type or paste a raw cron string and the UI fields update to match.
- **Validation**: Highlight invalid expressions with specific error messages.
- **Preset library**: Common presets (every minute, hourly, daily at midnight, weekly on Monday, etc.) available as one-click templates.

### Acceptance Criteria
- Bidirectional sync: changing fields updates the raw string and vice versa.
- Invalid expressions show inline errors within 200ms of input.
- All five standard cron fields are supported. Extended syntax (seconds, years) is a stretch goal.

---

## Feature 3: Execution History Dashboard

### Goal
Give users a centralized view of all past cron job executions with filtering and drill-down.

### Requirements
- **Table view**: Columns for job name, expression, last run time, duration, status (success / failure / running), and exit code.
- **Filters**: Filter by job name, status, and date range.
- **Sorting**: Sort by any column, default to most recent first.
- **Detail drawer**: Clicking a row opens a side panel with full output logs, environment info, and timing breakdown.
- **Pagination**: Handle large histories without degrading performance (virtual scrolling or server-side pagination).

### Acceptance Criteria
- Table renders 1,000 rows without visible jank.
- Filters apply within 300ms.
- Detail drawer loads full log output for a selected execution.

---

## Feature 4: Failure Alerts Panel

### Goal
Surface cron job failures immediately and provide actionable context for resolution.

### Requirements
- **Alert list**: Display all active and recent alerts, sorted by severity and recency.
- **Alert detail**: Each alert shows the failed job name, expression, failure time, exit code, last N lines of output, and a link to the full execution detail.
- **Severity levels**: Critical (repeated failures), Warning (single failure), Info (recovered after retry).
- **Acknowledge / Resolve actions**: Users can acknowledge an alert to stop notifications and resolve it when the issue is fixed.
- **Notification channels** (stretch): Configure email or webhook notifications for failure events.

### Acceptance Criteria
- New failures appear in the panel within 5 seconds of detection.
- Acknowledge and resolve actions update the alert state immediately.
- Alert panel is accessible from any page via a persistent badge/icon in the nav bar.

---

## Feature 5: Schedule Visualization

### Goal
Provide a visual timeline of scheduled jobs so users can spot overlaps, gaps, and load distribution.

### Requirements
- **Timeline view**: Horizontal timeline showing upcoming executions for all jobs over a configurable window (next hour, day, week).
- **Calendar view**: Monthly calendar with dots or bars indicating scheduled runs per day.
- **Overlap detection**: Highlight time slots where multiple jobs are scheduled to run simultaneously.
- **Zoom and pan**: Users can zoom into specific time ranges and pan forward/backward.
- **Color coding**: Each job gets a consistent color; status (pending, running, completed, failed) uses distinct visual indicators.

### Acceptance Criteria
- Timeline renders up to 50 jobs over a 7-day window without performance issues.
- Overlapping jobs are visually distinct and hoverable for detail.
- View switches (timeline / calendar) preserve the selected time window.

---

## Feature 6: Export / Import Crontab

### Goal
Enable portability by letting users import existing crontab files and export CronForge schedules back to standard crontab format.

### Requirements
- **Import**: Upload or paste a crontab file. Parser extracts each line into a CronForge job with expression, command, and optional comment.
- **Validation on import**: Flag invalid lines with specific error messages; allow partial import of valid lines.
- **Export**: Generate a downloadable crontab file from selected or all jobs.
- **JSON export**: Optionally export as structured JSON for use with APIs or automation tools.
- **Diff view** (stretch): When re-importing, show a diff of what changed compared to the current state.

### Acceptance Criteria
- Import correctly parses standard 5-field crontab files including comments and environment variable lines.
- Export produces a valid crontab file that can be installed with `crontab <file>` without errors.
- Round-trip fidelity: import then export produces an equivalent crontab (comments and ordering may differ).
