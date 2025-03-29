// src/components/dashboard/SchemaObjectItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for displaying a schema object type with count
 */
const SchemaObjectItem = ({
  count,
  label,
  icon,
  bgColor = 'bg-gray-50',
  textColor = 'text-gray-700',
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className={`p-2 rounded text-center ${bgColor}`}>
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-2 rounded text-center ${bgColor}`}>
      <div className={`font-semibold text-lg ${textColor}`}>
        {count.toLocaleString()}
      </div>
      <div className="text-gray-500 text-xs">{label}</div>
      {icon && (
        <div className="w-4 h-4 mx-auto mt-1">
          {icon}
        </div>
      )}
    </div>
  );
};

SchemaObjectItem.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  isLoading: PropTypes.bool
};

export default SchemaObjectItem;
