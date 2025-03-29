// src/hooks/useDatabaseStats.js
import { useState, useEffect, useCallback } from 'react';
import { getDatabaseStats } from '../services/databaseService';

/**
 * Custom hook for fetching database stats
 * @param {string} connectionId - The database connection ID
 * @param {number} refreshInterval - Refresh interval in milliseconds
 * @returns {Object} Stats state and methods
 */
const useDatabaseStats = (connectionId, refreshInterval = 30000) => {
  const [stats, setStats] = useState({
    status: 'Unknown',
    uptime: '',
    connections: 0,
    cpu: 0,
    memory: 0,
    diskSpace: 0,
    responseTime: 0,
    tables: 0,
    views: 0,
    storedProcedures: 0,
    functions: 0,
    triggers: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetch database stats
   */
  const fetchStats = useCallback(async () => {
    if (!connectionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getDatabaseStats(connectionId);
      setStats(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch database stats');
    } finally {
      setIsLoading(false);
    }
  }, [connectionId]);

  /**
   * Initialize stats polling
   */
  useEffect(() => {
    if (!connectionId) return;

    // Initial fetch
    fetchStats();

    // Set up polling
    const intervalId = setInterval(fetchStats, refreshInterval);

    // Clean up on unmount or when connectionId changes
    return () => {
      clearInterval(intervalId);
    };
  }, [connectionId, refreshInterval, fetchStats]);

  /**
   * Calculate total schema objects
   */
  const totalSchemaObjects = stats.tables +
    stats.views +
    stats.storedProcedures +
    stats.functions +
    stats.triggers;

  return {
    stats: {
      ...stats,
      totalSchemaObjects
    },
    isLoading,
    error,
    lastUpdated,
    refreshStats: fetchStats
  };
};

export default useDatabaseStats;
