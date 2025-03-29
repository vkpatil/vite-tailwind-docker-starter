// src/hooks/useDatabaseJobs.js
import { useState, useEffect, useCallback } from 'react';
import { getDatabaseJobs } from '../services/databaseService';

/**
 * Custom hook for fetching database pending jobs
 * @param {string} connectionId - The database connection ID
 * @param {number} refreshInterval - Refresh interval in milliseconds
 * @returns {Object} Jobs state and methods
 */
const useDatabaseJobs = (connectionId, refreshInterval = 60000) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetch database jobs
   */
  const fetchJobs = useCallback(async () => {
    if (!connectionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getDatabaseJobs(connectionId);
      setJobs(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch database jobs');
    } finally {
      setIsLoading(false);
    }
  }, [connectionId]);

  /**
   * Initialize jobs polling
   */
  useEffect(() => {
    if (!connectionId) return;

    // Initial fetch
    fetchJobs();

    // Set up polling
    const intervalId = setInterval(fetchJobs, refreshInterval);

    // Clean up on unmount or when connectionId changes
    return () => {
      clearInterval(intervalId);
    };
  }, [connectionId, refreshInterval, fetchJobs]);

  /**
   * Get count of jobs by status
   */
  const getJobCountByStatus = useCallback((status) => {
    return jobs.filter(job => job.status === status).length;
  }, [jobs]);

  const runningJobs = jobs.filter(job => job.status === 'Running');
  const queuedJobs = jobs.filter(job => job.status === 'Queued');
  const scheduledJobs = jobs.filter(job => job.status === 'Scheduled');

  return {
    jobs,
    isLoading,
    error,
    lastUpdated,
    refreshJobs: fetchJobs,
    getJobCountByStatus,
    runningJobs,
    queuedJobs,
    scheduledJobs,
    totalJobs: jobs.length
  };
};

export default useDatabaseJobs;
