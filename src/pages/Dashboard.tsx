import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CronBuilder from '../components/CronBuilder';
import ExecutionHistory from '../components/ExecutionHistory';
import AlertsPanel from '../components/AlertsPanel';
import ScheduleViz from '../components/ScheduleViz';
import ExportPanel from '../components/ExportPanel';
import type { CronFields } from '../lib/cron';
import { DEFAULT_CRON } from '../lib/cron';
import { MOCK_JOBS } from '../lib/mockData';
import './Dashboard.css';

type Tab = 'builder' | 'history' | 'alerts' | 'schedule' | 'export';

const TABS: { key: Tab; label: string }[] = [
  { key: 'builder', label: 'Builder' },
  { key: 'history', label: 'History' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'export', label: 'Export' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('builder');
  const [cronFields, setCronFields] = useState<CronFields>(DEFAULT_CRON);
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-brand" onClick={() => navigate('/')} role="button" tabIndex={0}>
          <span className="brand-name">CronForge</span>
        </div>
        <nav className="dashboard-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`tab-btn ${activeTab === tab.key ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="dashboard-content">
        {activeTab === 'builder' && (
          <CronBuilder fields={cronFields} onChange={setCronFields} />
        )}
        {activeTab === 'history' && <ExecutionHistory />}
        {activeTab === 'alerts' && <AlertsPanel />}
        {activeTab === 'schedule' && <ScheduleViz jobs={MOCK_JOBS} />}
        {activeTab === 'export' && <ExportPanel fields={cronFields} />}
      </main>
    </div>
  );
}
