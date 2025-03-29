// src/components/ui/StatBox.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable stat box component for metrics display
 */
const StatBox = ({
  label,
  value,
  icon,
  bgColor = 'bg-gray-100',
  textColor = 'text-gray-700',
  iconColor,
  className = '',
  isLoading = false
}) => {
  const iconColorClass = iconColor || textColor;
  
  if (isLoading) {
    return (
      <div className={`p-2 rounded ${bgColor} ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-2 rounded ${bgColor} ${className}`}>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="flex items-center">
        <div className={`font-semibold ${textColor}`}>{value}</div>
        {icon && (
          <div className={`ml-auto ${iconColorClass}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

StatBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  iconColor: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

export default StatBox;
