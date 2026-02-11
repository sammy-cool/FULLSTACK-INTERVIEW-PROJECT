import React from 'react';
import { Calendar, User, Flag } from 'lucide-react';
import { format } from 'date-fns';

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const statusColors = {
  'todo': 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  'review': 'bg-purple-100 text-purple-700',
  'done': 'bg-green-100 text-green-700',
  'blocked': 'bg-red-100 text-red-700',
};

const TaskList = ({ tasks, isLoading, onSelectTask, selectedTaskId }) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {tasks.map((task) => (
        <div
          key={task._id}
          onClick={() => onSelectTask(task)}
          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedTaskId === task._id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-gray-900 flex-1">{task.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
              {task.status}
            </span>
          </div>

          {task.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            {task.project && (
              <span className="flex items-center gap-1">
                <span className="font-medium">{task.project.name}</span>
              </span>
            )}

            {task.assignedTo && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {task.assignedTo.name}
              </span>
            )}

            {task.priority && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColors[task.priority]}`}>
                <Flag className="w-3 h-3 inline mr-1" />
                {task.priority}
              </span>
            )}

            {task.dueDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
