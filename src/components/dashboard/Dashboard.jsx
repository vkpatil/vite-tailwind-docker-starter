// src/components/dashboard/Dashboard.jsx
import React, { useState, useCallback } from 'react';
import ConnectionForm from './ConnectionForm';
import StatusCard from './StatusCard';
import IssuesCard from './IssuesCard';
import PendingJobsCard from './PendingJobsCard';
import PerformanceChart from './PerformanceChart';
import LogsTable from './LogsTable';

// Custom hooks
import useDatabaseConnection from '../../hooks/useDatabaseConnection';
import useDatabaseStats from '../../hooks/useDatabaseStats';
import useDatabaseIssues from '../../hooks/useDatabaseIssues';
import useDatabaseJobs from '../../hooks/useDatabaseJobs';
import useDatabaseLogs from '../../hooks/useDatabaseLogs';
import usePerformanceMetrics from '../../hooks/usePerformanceMetrics';


/**
 * Main dashboard component
 */
const Dashboard = () => {
  // Default connection string for development
  const defaultConnectionString = 'Server=localhost;Database=master;User Id=sa;Password=yourStrong(!)Password;';
  
  // Database connection state
  const {
    connectionString,
    connectionId,
    isConnected,
    isLoading: isConnectionLoading,
    error: connectionError,
    updateConnectionString,
    connect,
    disconnect,
    reset: resetConnection
  } = useDatabaseConnection(defaultConnectionString);
  
  // Database stats state
  const {
    stats,
    isLoading: isStatsLoading,
    error: statsError,
    refreshStats
  } = useDatabaseStats(connectionId);
  
  // Database issues state
  const {
    issues,
    isLoading: isIssuesLoading,
    error: issuesError,
    refreshIssues
  } = useDatabaseIssues(connectionId);
  
  // Database jobs state
  const {
    jobs,
    isLoading: isJobsLoading,
    error: jobsError,
    refreshJobs
  } = useDatabaseJobs(connectionId);
  
  // Database logs state
  const {
    logs,
    isLoading: isLogsLoading,
    error: logsError,
    refreshLogs
  } = useDatabaseLogs(connectionId);
  
  // Performance metrics state
  const {
    metrics,
    isLoading: isMetricsLoading,
    error: metricsError,
    refreshMetrics
  } = usePerformanceMetrics(connectionId);
  
  /**
   * Handle global dashboard refresh
   */
  const handleRefresh = useCallback(() => {
    refreshStats();
    refreshIssues();
    refreshJobs();
    refreshLogs();
    refreshMetrics();
  }, [refreshStats, refreshIssues, refreshJobs, refreshLogs, refreshMetrics]);
  
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 bg-gray-50">
      {/* Connection form */}
      <ConnectionForm
        connectionString={connectionString}
        onConnectionStringChange={updateConnectionString}
        onConnect={connect}
        onDisconnect={disconnect}
        onRefresh={handleRefresh}
        isConnected={isConnected}
        isLoading={isConnectionLoading}
        error={connectionError}
      />
      
      {isConnected ? (
        <>
          {/* Dashboard grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            {/* Status card */}
            <StatusCard
              stats={stats}
              isLoading={isStatsLoading}
              error={statsError}
              onRefresh={refreshStats}
            />
            
            {/* Issues card */}
            <IssuesCard
              issues={issues}
              isLoading={isIssuesLoading}
              error={issuesError}
              onRefresh={refreshIssues}
            />
            
            {/* Pending Jobs card */}
            <PendingJobsCard
              jobs={jobs}
              isLoading={isJobsLoading}
              error={jobsError}
              onRefresh={refreshJobs}
            />
          </div>
          
          {/* Performance chart */}
          <PerformanceChart
            metrics={metrics}
            isLoading={isMetricsLoading}
            error={metricsError}
            onRefresh={refreshMetrics}
          />
          
          {/* Logs table */}
          <LogsTable
            logs={logs}
            isLoading={isLogsLoading}
            error={logsError}
            onRefresh={refreshLogs}
          />
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="mx-auto mb-4 text-gray-400">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5z"></path>
              <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
              <path d="M16 19h-8a2 2 0 0 1-2-2v-7l2.47-2.47A2 2 0 0 1 9.87 7h4.26a2 2 0 0 1 1.4.53L18 10v7a2 2 0 0 1-2 2z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Not Connected</h2>
          <p className="text-gray-500 mb-4">Enter your database connection string and click Connect to begin monitoring.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
