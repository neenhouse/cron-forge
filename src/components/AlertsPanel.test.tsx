import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertsPanel from './AlertsPanel';

describe('AlertsPanel', () => {
  it('renders alerts', () => {
    render(<AlertsPanel />);
    expect(screen.getByText('Failure Alerts')).toBeInTheDocument();
    const cards = screen.getAllByTestId('alert-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('shows retry buttons on active alerts', () => {
    render(<AlertsPanel />);
    const retryButtons = screen.getAllByText('Retry');
    expect(retryButtons.length).toBeGreaterThan(0);
  });

  it('resolves an alert when clicking resolve', () => {
    render(<AlertsPanel />);
    const resolveButtons = screen.getAllByText('Resolve');
    const initialActive = screen.getByText(/active/).textContent;
    fireEvent.click(resolveButtons[0]);
    const updatedActive = screen.getByText(/active/).textContent;
    expect(updatedActive).not.toBe(initialActive);
  });
});
