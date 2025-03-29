// src/components/ui/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { RefreshCw, AlertTriangle } from 'lucide-react';

/**
 * Reusable card component for dashboard
 */
const Card = ({ 
  title, 
  icon, 
  className = '', 
  headerClassName = '', 
  bodyClassName = '',
  isLoading = false,
  error = null,
  onRefresh,
  children 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {title && (
        <div className={`flex items-center justify-between p-4 ${headerClassName}`}>
          <h2 className="text-lg font-semibold flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h2>
          
          {onRefresh && (
            <button 
              onClick={onRefresh} 
              disabled={isLoading}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin text-blue-500' : 'text-gray-500'} />
            </button>
          )}
        </div>
      )}
      
      <div className={`p-4 ${title ? 'pt-0' : ''} ${bodyClassName}`}>
        {error ? (
          <div className="flex items-center text-red-500 p-2 bg-red-50 rounded">
            <AlertTriangle size={16} className="mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        ) : isLoading && !children ? (
          <div className="flex justify-center items-center p-4">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func,
  children: PropTypes.node
};

export default Card;
