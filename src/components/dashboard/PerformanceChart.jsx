// src/components/dashboard/PerformanceChart.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

/**
 * Component for displaying database performance metrics chart
 */
const PerformanceChart = ({ 
  metrics, 
  isLoading, 
  error,
  onRefresh
}) => {
  // Default data to show when no metrics are available
  const defaultData = [
    { time: '6:00', queries: 0, cpu: 0, memory: 0 },
    { time: '7:00', queries: 0, cpu: 0, memory: 0 },
    { time: '8:00', queries: 0, cpu: 0, memory: 0 },
    { time: '9:00', queries: 0, cpu: 0, memory: 0 },
    { time: '10:00', queries: 0, cpu: 0, memory: 0 },
    { time: '11:00', queries: 0, cpu: 0, memory: 0 }
  ];
  
  // Use actual metrics if available, otherwise use default data
  const chartData = metrics.length > 0 ? metrics : defaultData;
  
  // Create loading placeholders
  const loadingTemplate = (
    <div className="animate-pulse">
      <div className="h-64 w-full bg-gray-200 rounded"></div>
    </div>
  );
  
  return (
    <Card
      title="Performance"
      icon={<Activity />}
      className="mb-6"
      isLoading={isLoading}
      error={error}
      onRefresh={onRefresh}
    >
      {isLoading ? (
        loadingTemplate
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="queries" 
              name="Queries/min" 
              stroke="#3b82f6" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="cpu" 
              name="CPU %" 
              stroke="#ef4444" 
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="memory" 
              name="Memory %" 
              stroke="#10b981" 
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

PerformanceChart.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      queries: PropTypes.number,
      cpu: PropTypes.number,
      memory: PropTypes.number
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func
};

export default PerformanceChart;
