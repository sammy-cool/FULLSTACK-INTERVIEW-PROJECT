import React from 'react';
import { CheckCircle, Clock, AlertCircle, ListTodo } from 'lucide-react';

const TaskStats = ({ stats }) => {
  const getStatusCount = (status) => {
    const statusObj = stats.byStatus?.find((s) => s._id === status);
    return statusObj?.count || 0;
  };

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'In Progress',
      value: getStatusCount('in-progress'),
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Completed',
      value: getStatusCount('done'),
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Blocked',
      value: getStatusCount('blocked'),
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
