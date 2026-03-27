import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExecutionHistory from './ExecutionHistory';

describe('ExecutionHistory', () => {
  it('renders the execution table', () => {
    render(<ExecutionHistory />);
    expect(screen.getByText('Execution History')).toBeInTheDocument();
    const rows = screen.getAllByTestId('execution-row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('shows filter buttons', () => {
    render(<ExecutionHistory />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Running')).toBeInTheDocument();
  });

  it('filters by status when clicking filter buttons', () => {
    render(<ExecutionHistory />);
    const allRows = screen.getAllByTestId('execution-row');
    const totalCount = allRows.length;

    fireEvent.click(screen.getByText('Failed'));
    const failedRows = screen.getAllByTestId('execution-row');
    expect(failedRows.length).toBeLessThan(totalCount);
  });
});
