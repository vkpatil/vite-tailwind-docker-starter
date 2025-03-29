// src/utils/formatters.js
/**
 * Utility functions for formatting data
 */

/**
 * Format a timestamp to a readable time string
 * @param {string} timestamp - The timestamp to format
 * @returns {string} Formatted time string
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format a duration in minutes to a readable string
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
export const formatDuration = (minutes) => {
  if (!minutes || isNaN(minutes)) return '';

  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = Math.floor(minutes % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0 || parts.length === 0) parts.push(`${mins}m`);

  return parts.join(' ');
};

/**
 * Format a percentage value with fixed decimals
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined) return '';
  return `${parseFloat(value).toFixed(decimals)}%`;
};

/**
 * Get a color class based on severity level
 * @param {string} severity - The severity level
 * @returns {string} CSS color class
 */
export const getSeverityColorClass = (severity) => {
  switch (severity?.toLowerCase()) {
    case 'error':
      return 'text-red-500';
    case 'warning':
      return 'text-yellow-500';
    case 'info':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
};

/**
 * Get status color classes
 * @param {string} status - The status value
 * @returns {string} CSS color classes
 */
export const getStatusColorClasses = (status) => {
  switch (status?.toLowerCase()) {
    case 'healthy':
    case 'online':
    case 'running':
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'warning':
    case 'queued':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'error':
    case 'offline':
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Format a number with commas as thousands separators
 * @param {number} value - The number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined) return '';
  return new Intl.NumberFormat().format(value);
};
