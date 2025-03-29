// src/services/databaseService.js
/**
 * Service for interacting with the database API
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Connect to a database using the provided connection string
 * @param {string} connectionString - The database connection string
 * @returns {Promise<Object>} Connection response with connection ID and initial stats
 */
export const connectToDatabase = async (connectionString) => {
  try {
    const response = await fetch(`${API_BASE_URL}/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ connectionString }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to connect to database');
    }

    return await response.json();
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
};

/**
 * Disconnect from a database
 * @param {string} connectionId - The connection ID
 * @returns {Promise<Object>} Disconnect response
 */
export const disconnectFromDatabase = async (connectionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/disconnect/${connectionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to disconnect from database');
    }

    return await response.json();
  } catch (error) {
    console.error('Disconnection error:', error);
    throw error;
  }
};

/**
 * Get database status and metrics
 * @param {string} connectionId - The connection ID
 * @returns {Promise<Object>} Database stats
 */
export const getDatabaseStats = async (connectionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/status/${connectionId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get database stats');
    }

    const data = await response.json();
    return data.stats;
  } catch (error) {
    console.error('Error getting database stats:', error);
    throw error;
  }
};

/**
 * Get database issues
 * @param {string} connectionId - The connection ID
 * @returns {Promise<Array>} List of issues
 */
export const getDatabaseIssues = async (connectionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/issues/${connectionId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get database issues');
    }

    const data = await response.json();
    return data.issues;
  } catch (error) {
    console.error('Error getting database issues:', error);
    throw error;
  }
};

/**
 * Get database pending jobs
 * @param {string} connectionId - The connection ID
 * @returns {Promise<Array>} List of pending jobs
 */
export const getDatabaseJobs = async (connectionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${connectionId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get database jobs');
    }

    const data = await response.json();
    return data.jobs;
  } catch (error) {
    console.error('Error getting database jobs:', error);
    throw error;
  }
};

/**
 * Get database logs
 * @param {string} connectionId - The connection ID
 * @returns {Promise<Array>} List of logs
 */
export const getDatabaseLogs = async (connectionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/logs/${connectionId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get database logs');
    }

    const data = await response.json();
    return data.logs;
  } catch (error) {
    console.error('Error getting database logs:', error);
    throw error;
  }
};

/**
 * Get performance metrics
 * @param {string} connectionId - The connection ID
 * @param {number} hours - Number of hours to retrieve data for
 * @returns {Promise<Array>} Performance metrics
 */
export const getPerformanceMetrics = async (connectionId, hours = 6) => {
  try {
    const response = await fetch(`${API_BASE_URL}/performance/${connectionId}?hours=${hours}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get performance metrics');
    }

    const data = await response.json();
    return data.performance;
  } catch (error) {
    console.error('Error getting performance metrics:', error);
    throw error;
  }
};
