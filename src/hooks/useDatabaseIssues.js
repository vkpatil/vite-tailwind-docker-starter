// src/hooks/useDatabaseIssues.js
import { useState, useEffect, useCallback } from 'react';
import { getDatabaseIssues } from '../services/databaseService';

/**
 * Custom hook for fetching database issues
 * @param {string} connectionId - The database connection ID
 * @param {number} refreshInterval - Refresh interval in milliseconds
 * @returns {Object} Issues state and methods
 */
const useDatabaseIssues = (connectionId, refreshInterval = 60000) => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetch database issues
   */
  const fetchIssues = useCallback(async () => {
    if (!connectionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getDatabaseIssues(connectionId);
      setIssues(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch database issues');
    } finally {
      setIsLoading(false);
    }
  }, [connectionId]);

  /**
   * Initialize issues polling
   */
  useEffect(() => {
    if (!connectionId) return;

    // Initial fetch
    fetchIssues();

    // Set up polling
    const intervalId = setInterval(fetchIssues, refreshInterval);

    // Clean up on unmount or when connectionId changes
    return () => {
      clearInterval(intervalId);
    };
  }, [connectionId, refreshInterval, fetchIssues]);

  /**
   * Get count of issues by severity
   */
  const getIssueCountBySeverity = useCallback((severity) => {
    return issues.filter(issue => issue.severity === severity).length;
  }, [issues]);

  /**
   * Check if there are critical issues
   */
  const hasCriticalIssues = useCallback(() => {
    return issues.some(issue => issue.severity === 'error');
  }, [issues]);

  return {
    issues,
    isLoading,
    error,
    lastUpdated,
    refreshIssues: fetchIssues,
    getIssueCountBySeverity,
    hasCriticalIssues,
    totalIssueCount: issues.length
  };
};

export default useDatabaseIssues;
