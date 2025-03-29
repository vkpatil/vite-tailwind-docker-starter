// src/hooks/useDatabaseConnection.js
import { useState, useCallback } from 'react';
import { connectToDatabase, disconnectFromDatabase } from '../services/databaseService';

/**
 * Custom hook for managing database connection
 * @param {string} initialConnectionString - Initial connection string
 * @returns {Object} Connection state and methods
 */
const useDatabaseConnection = (initialConnectionString = '') => {
  const [connectionString, setConnectionString] = useState(initialConnectionString);
  const [connectionId, setConnectionId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Connect to the database
   * @returns {Promise<boolean>} Success indicator
   */
  const connect = useCallback(async () => {
    if (isLoading) return false;
    if (!connectionString.trim()) {
      setError('Connection string is required');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await connectToDatabase(connectionString);
      setConnectionId(response.connectionId);
      setIsConnected(true);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to connect to database');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [connectionString, isLoading]);

  /**
   * Disconnect from the database
   * @returns {Promise<boolean>} Success indicator
   */
  const disconnect = useCallback(async () => {
    if (!connectionId || !isConnected) return true;

    setIsLoading(true);
    setError(null);

    try {
      await disconnectFromDatabase(connectionId);
      setConnectionId(null);
      setIsConnected(false);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to disconnect from database');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [connectionId, isConnected]);

  /**
   * Update the connection string
   * @param {string} newConnectionString - New connection string
   */
  const updateConnectionString = useCallback((newConnectionString) => {
    setConnectionString(newConnectionString);
  }, []);

  /**
   * Reset connection state
   */
  const reset = useCallback(() => {
    setConnectionId(null);
    setIsConnected(false);
    setError(null);
  }, []);

  return {
    connectionString,
    connectionId,
    isConnected,
    isLoading,
    error,
    updateConnectionString,
    connect,
    disconnect,
    reset
  };
};

export default useDatabaseConnection;
