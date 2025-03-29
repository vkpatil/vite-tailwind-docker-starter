// src/components/dashboard/ConnectionForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Database, RefreshCw } from 'lucide-react';

/**
 * Component for database connection form
 */
const ConnectionForm = ({
  connectionString,
  onConnectionStringChange,
  onConnect,
  onDisconnect,
  onRefresh,
  isConnected,
  isLoading,
  error
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Function to toggle password visibility in connection string
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  // Function to mask password in connection string
  const getDisplayConnectionString = () => {
    if (isPasswordVisible) return connectionString;
    
    const regex = /(Password=)([^;]+)/i;
    return connectionString.replace(regex, '$1******');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isConnected) {
      onDisconnect();
    } else {
      onConnect();
    }
  };
  
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Database className="mr-2" /> SQL Server Monitor
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              value={getDisplayConnectionString()}
              onChange={(e) => onConnectionStringChange(e.target.value)}
              placeholder="Server=localhost;Database=master;User Id=sa;Password=yourPassword;"
              className={`w-full p-2 pr-24 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isConnected || isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 px-2 py-1 rounded"
            >
              {isPasswordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading || !connectionString.trim()}
            className={`px-4 py-2 rounded font-medium ${
              isConnected
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]`}
          >
            {isLoading
              ? 'Connecting...'
              : isConnected
                ? 'Disconnect'
                : 'Connect'
            }
          </button>
          
          {isConnected && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          )}
        </div>
        
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
      </form>
    </div>
  );
};

ConnectionForm.propTypes = {
  connectionString: PropTypes.string.isRequired,
  onConnectionStringChange: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default ConnectionForm;
