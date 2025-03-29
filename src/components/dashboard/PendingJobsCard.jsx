// src/components/dashboard/PendingJobsCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Clock } from 'lucide-react';
import Card from '../ui/Card';
import { getStatusColorClasses } from '../../utils/formatters';

/**
 * Component for displaying database pending jobs
 */
const PendingJobsCard = ({ 
  jobs, 
  isLoading, 
  error,
  onRefresh
}) => {
  return (
    <Card
      title="Pending Jobs"
      icon={<Clock />}
      className="md:col-span-4"
      isLoading={isLoading}
      error={error}
      onRefresh={onRefresh}
    >
      <div className="space-y-3">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job.id} className="border-b pb-2 last:border-b-0 last:pb-0">
              <div className="flex justify-between">
                <span className="font-medium">{job.name}</span>
                <span className={`text-sm px-2 py-1 rounded ${getStatusColorClasses(job.status)}`}>
                  {job.status}
                </span>
              </div>
              <div className="text-xs text-gray-500 flex justify-between mt-1">
                <span>Start: {job.startTime}</span>
                <span>Duration: {job.estimatedDuration}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">No pending jobs</div>
        )}
      </div>
      
      {jobs.length > 0 && (
        <div className="mt-4 pt-2 border-t text-right">
          <button className="text-sm text-blue-500 hover:text-blue-700">
            View all jobs
          </button>
        </div>
      )}
    </Card>
  );
};

PendingJobsCard.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      startTime: PropTypes.string,
      estimatedDuration: PropTypes.string
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func
};

export default PendingJobsCard;
