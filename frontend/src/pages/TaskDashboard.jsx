import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { taskService, projectService } from '../services/taskService';
import { useTaskStore } from '../store/store';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskDetails from '../components/TaskDetails';
import TaskStats from '../components/TaskStats';
import FilterBar from '../components/FilterBar';
import { Plus, LayoutDashboard } from 'lucide-react';

const TaskDashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const { selectedTask, setSelectedTask, filters } = useTaskStore();
  const queryClient = useQueryClient();

  // Fetch tasks with filters
  const { data: tasksData, isLoading: tasksLoading } = useQuery(
    ['tasks', filters],
    () => taskService.getTasks(filters),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Fetch projects
  const { data: projectsData } = useQuery(
    'projects',
    () => projectService.getProjects(),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Fetch task statistics
  const { data: statsData } = useQuery(
    'taskStats',
    () => taskService.getTaskStats(),
    {
      enabled: showStats,
      refetchOnWindowFocus: false,
    }
  );

  // Create task mutation
  const createTaskMutation = useMutation(
    (taskData) => taskService.createTask(taskData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        queryClient.invalidateQueries('taskStats');
        setShowTaskForm(false);
      },
    }
  );

  // Update task mutation
  const updateTaskMutation = useMutation(
    ({ id, data }) => taskService.updateTask(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        queryClient.invalidateQueries('taskStats');
      },
    }
  );

  // Delete task mutation
  const deleteTaskMutation = useMutation(
    (id) => taskService.deleteTask(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        queryClient.invalidateQueries('taskStats');
        setSelectedTask(null);
      },
    }
  );

  const handleCreateTask = (taskData) => {
    createTaskMutation.mutate(taskData);
  };

  const handleUpdateTask = (id, taskData) => {
    updateTaskMutation.mutate({ id, data: taskData });
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(id);
    }
  };

  const tasks = tasksData?.data || [];
  const projects = projectsData?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
            </div>
            <button
              onClick={() => setShowTaskForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Section */}
        {showStats && statsData && (
          <div className="mb-6">
            <TaskStats stats={statsData.data} />
          </div>
        )}

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar projects={projects} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Tasks ({tasks.length})
                </h2>
              </div>
              <TaskList
                tasks={tasks}
                isLoading={tasksLoading}
                onSelectTask={setSelectedTask}
                selectedTaskId={selectedTask?._id}
              />
            </div>
          </div>

          {/* Task Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedTask ? (
              <TaskDetails
                task={selectedTask}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
                onClose={() => setSelectedTask(null)}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <p className="text-gray-500">Select a task to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          projects={projects}
          onSubmit={handleCreateTask}
          onClose={() => setShowTaskForm(false)}
          isLoading={createTaskMutation.isLoading}
        />
      )}
    </div>
  );
};

export default TaskDashboard;
