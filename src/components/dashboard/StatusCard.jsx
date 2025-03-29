// src/components/dashboard/StatusCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Server } from 'lucide-react';
import Card from '../ui/Card';
import StatBox from '../ui/StatBox';
import SchemaObjects from './SchemaObjects';

/**
 * Component for displaying database status information
 */
const StatusCard = ({ 
  stats, 
  isLoading, 
  error,
  onRefresh
}) => {
  return (
    <Card
      title="Database Status"
      icon={<Server />}
      className="md:col-span-4"
      isLoading={isLoading}
      error={error}
      onRefresh={onRefresh}
    >
      <div className="flex items-center mb-4">
        <div className={`w-3 h-3 rounded-full mr-2 ${
          stats.status === 'Healthy' || stats.status === 'Online' 
            ? 'bg-green-500' 
            : stats.status === 'Warning' 
              ? 'bg-yellow-500' 
              : 'bg-red-500'
        }`}></div>
        <span className="font-medium">{stats.status}</span>
        <span className="text-gray-500 ml-auto">{stats.uptime} uptime</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <StatBox 
          label="CPU" 
          value={`${stats.cpu}%`} 
          isLoading={isLoading} 
        />
        <StatBox 
          label="Memory" 
          value={`${stats.memory}%`} 
          isLoading={isLoading} 
        />
        <StatBox 
          label="Disk" 
          value={`${stats.diskSpace}%`} 
          isLoading={isLoading} 
        />
        <StatBox 
          label="Response" 
          value={`${stats.responseTime}ms`} 
          isLoading={isLoading} 
        />
      </div>
      
      <h3 className="text-md font-semibold mb-2">Schema Objects</h3>
      <SchemaObjects stats={stats} isLoading={isLoading} />
    </Card>
  );
};

StatusCard.propTypes = {
  stats: PropTypes.shape({
    status: PropTypes.string,
    uptime: PropTypes.string,
    connections: PropTypes.number,
    cpu: PropTypes.number,
    memory: PropTypes.number,
    diskSpace: PropTypes.number,
    responseTime: PropTypes.number,
    tables: PropTypes.number,
    views: PropTypes.number,
    storedProcedures: PropTypes.number,
    functions: PropTypes.number,
    triggers: PropTypes.number,
    totalSchemaObjects: PropTypes.number
  }).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func
};

export default StatusCard;
