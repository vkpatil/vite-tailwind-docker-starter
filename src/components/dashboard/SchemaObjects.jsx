// src/components/dashboard/SchemaObjects.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Database, FileText, Code, Zap } from 'lucide-react';
import SchemaObjectItem from './SchemaObjectItem';

/**
 * Component for displaying database schema objects grid
 */
const SchemaObjects = ({ stats, isLoading }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <SchemaObjectItem
        count={stats.tables}
        label="Tables"
        icon={<Database className="w-4 h-4 mx-auto text-blue-700" />}
        bgColor="bg-blue-50"
        textColor="text-blue-700"
        isLoading={isLoading}
      />
      
      <SchemaObjectItem
        count={stats.views}
        label="Views"
        icon={<FileText className="w-4 h-4 mx-auto text-green-700" />}
        bgColor="bg-green-50"
        textColor="text-green-700"
        isLoading={isLoading}
      />
      
      <SchemaObjectItem
        count={stats.storedProcedures}
        label="Procedures"
        icon={<Code className="w-4 h-4 mx-auto text-purple-700" />}
        bgColor="bg-purple-50"
        textColor="text-purple-700"
        isLoading={isLoading}
      />
      
      <SchemaObjectItem
        count={stats.functions}
        label="Functions"
        icon={<Code className="w-4 h-4 mx-auto text-yellow-700" />}
        bgColor="bg-yellow-50"
        textColor="text-yellow-700"
        isLoading={isLoading}
      />
      
      <SchemaObjectItem
        count={stats.triggers}
        label="Triggers"
        icon={<Zap className="w-4 h-4 mx-auto text-red-700" />}
        bgColor="bg-red-50"
        textColor="text-red-700"
        isLoading={isLoading}
      />
      
      <SchemaObjectItem
        count={stats.tables + stats.views + stats.storedProcedures + stats.functions + stats.triggers}
        label="Total"
        icon={<Database className="w-4 h-4 mx-auto text-gray-700" />}
        bgColor="bg-gray-50"
        textColor="text-gray-700"
        isLoading={isLoading}
      />
    </div>
  );
};

SchemaObjects.propTypes = {
  stats: PropTypes.shape({
    tables: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    storedProcedures: PropTypes.number.isRequired,
    functions: PropTypes.number.isRequired,
    triggers: PropTypes.number.isRequired
  }).isRequired,
  isLoading: PropTypes.bool
};

export default SchemaObjects;
