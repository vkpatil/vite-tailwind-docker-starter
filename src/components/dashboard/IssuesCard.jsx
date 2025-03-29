// src/components/dashboard/IssuesCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';

/**
 * Component for displaying database issues
 */
const IssuesCard = ({ 
  issues, 
  isLoading, 
  error,
  onRefresh
}) => {
  const getSeverityIcon = (severity) => {
    switch(severity) {
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
      title="Issues"
      icon={<AlertTriangle />}
      className="md:col-span-4"
      isLoading={isLoading}
      error={error}
      onRefresh={onRefresh}
    >
      <div className="space-y-3">
        {issues.length > 0 ? (
          issues.map(issue => (
            <div key={issue.id} className="flex items-start">
              <div className="mt-1 mr-2">
                {getSeverityIcon(issue.severity)}
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium">{issue.message}</div>
                <div className="text-xs text-gray-500">{issue.timestamp}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">No issues detected</div>
        )}
      </div>
      
      {issues.length > 0 && (
        <div className="mt-4 pt-2 border-t text-right">
          <button className="text-sm text-blue-500 hover:text-blue-700">
            View all issues
          </button>
        </div>
      )}
    </Card>
  );
};

IssuesCard.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      severity: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func
};

export default IssuesCard;
