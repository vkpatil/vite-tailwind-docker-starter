// src/components/dashboard/LogsTable.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { List, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';

/**
 * Component for displaying database logs in a table
 */
const LogsTable = ({ 
  logs, 
  isLoading, 
  error,
  onRefresh
}) => {
  const getSeverityIcon = (type) => {
    switch(type) {
      case 'error':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'info':
        return <CheckCircle size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Card
      title="Recent Logs"
      icon={<List />}
      isLoading={isLoading}
      error={error}
      onRefresh={onRefresh}
    >
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
          </div>
        ) : logs.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Time</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.map(log => (
                <tr key={log.id}>
                  <td className="px-4 py-3 text-sm text-gray-500">{log.timestamp}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center">
                      {getSeverityIcon(log.type)}
                      <span className="ml-1 capitalize">{log.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-4">No logs available</div>
        )}
      </div>
      
      {logs.length > 0 && (
        <div className="mt-4 pt-2 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {logs.length} of {logs.length} logs
          </div>
          <button className="text-sm text-blue-500 hover:text-blue-700">
            View all logs
          </button>
        </div>
      )}
    </Card>
  );
};

LogsTable.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func
};

export default LogsTable;
