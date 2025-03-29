// src/hooks/usePerformanceMetrics.js
import { useState, useEffect, useCallback } from 'react';
import { getPerformanceMetrics } from '../services/databaseService';

/**
 * Custom hook for fetching performance metrics
 * @param {string} connectionId - The database connection ID
 * @param {number} hours - Number of hours to get data for
 * @param {number} refreshInterval - Refresh interval in milliseconds
 * @returns {Object} Performance metrics state and methods
 */
const usePerformanceMetrics = (connectionId, hours = 6, refreshInterval = 60000) => {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetch performance metrics
   */
  const fetchMetrics = useCallback(async () => {
    if (!connectionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getPerformanceMetrics(connectionId, hours);
      setMetrics(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch performance metrics');
    } finally {
      setIsLoading(false);
    }
  }, [connectionId, hours]);

  /**
   * Initialize metrics polling
   */
  useEffect(() => {
    if (!connectionId) return;

    // Initial fetch
    fetchMetrics();

    // Set up polling
    const intervalId = setInterval(fetchMetrics, refreshInterval);

    // Clean up on unmount or when connectionId changes
    return () => {
      clearInterval(intervalId);
    };
  }, [connectionId, hours, refreshInterval, fetchMetrics]);

  /**
   * Get the latest metrics
   */
  const getLatestMetrics = useCallback(() => {
    if (!metrics.length) return null;
    return metrics[metrics.length - 1];
  }, [metrics]);

  /**
   * Get the maximum value for a specific metric
   */
  const getMaxValue = useCallback((key) => {
    if (!metrics.length) return 0;
    return Math.max(...metrics.map(item => item[key] || 0));
  }, [metrics]);

  /**
   * Get the average value for a specific metric
   */
  const getAverageValue = useCallback((key) => {
    if (!metrics.length) return 0;
    const sum = metrics.reduce((acc, item) => acc + (item[key] || 0), 0);
    return sum / metrics.length;
  }, [metrics]);

  return {
    metrics,
    isLoading,
    error,
    lastUpdated,
    refreshMetrics: fetchMetrics,
    getLatestMetrics,
    getMaxValue,
    getAverageValue
  };
};

export default usePerformanceMetrics;
