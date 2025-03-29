// src/hooks/useDatabaseLogs.js
import { useState, useEffect, useCallback } from 'react';
import { getDatabaseLogs } from '../services/databaseService';

/**
 * Custom hook for fetching database logs
 * @param {string} connectionId - The database connection ID
 * @param {number} refreshInterval - Refresh interval in milliseconds
 * @returns {Object} Logs state and methods
 */
const useDatabaseLogs = (connectionId, refreshInterval = 30000) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetch database logs
   */
  const fetchLogs = useCallback(async () => {
    if (!connectionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getDatabaseLogs(connectionId);
      setLogs(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch database logs');
    } finally {
      setIsLoading(false);
    }
  }, [connectionId]);

  /**
   * Initialize logs polling
   */
  useEffect(() => {
    if (!connectionId) return;

    // Initial fetch
    fetchLogs();

    // Set up polling
    const intervalId = setInterval(fetchLogs, refreshInterval);

    // Clean up on unmount or when connectionId changes
    return () => {
      clearInterval(intervalId);
    };
  }, [connectionId, refreshInterval, fetchLogs]);

  /**
   * Get logs filtered by type
   */
  const getLogsByType = useCallback((type) => {
    return logs.filter(log => log.type === type);
  }, [logs]);

  const errorLogs = getLogsByType('error');
  const warningLogs = getLogsByType('warning');
  const infoLogs = getLogsByType('info');

  return {
    logs,
    isLoading,
    error,
    lastUpdated,
    refreshLogs: fetchLogs,
    getLogsByType,
    errorLogs,
    warningLogs,
    infoLogs,
    totalLogs: logs.length
  };
};

export default useDatabaseLogs;
