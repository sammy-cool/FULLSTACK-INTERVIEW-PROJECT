import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { commentService } from '../services/taskService';
import { X, Edit2, Trash2, MessageCircle, Calendar, User, Flag, Clock } from 'lucide-react';
import { format } from 'date-fns';

const TaskDetails = ({ task, onUpdate, onDelete, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(task.status);
  const [commentText, setCommentText] = useState('');
  const queryClient = useQueryClient();

  // Fetch comments
  const { data: commentsData } = useQuery(
    ['comments', task._id],
    () => commentService.getComments(task._id),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Add comment mutation
  const addCommentMutation = useMutation(
    (commentData) => commentService.createComment(commentData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', task._id]);
        setCommentText('');
      },
    }
  );

  const handleStatusUpdate = () => {
    onUpdate(task._id, { status: editedStatus });
    setIsEditing(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addCommentMutation.mutate({
        task: task._id,
        content: commentText,
      });
    }
  };

  const comments = commentsData?.data || [];

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    'review': 'bg-purple-100 text-purple-700',
    'done': 'bg-green-100 text-green-700',
    'blocked': 'bg-red-100 text-red-700',
  };

  const priorityColors = {
    low: 'text-gray-600',
    medium: 'text-blue-600',
    high: 'text-orange-600',
    urgent: 'text-red-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-gray-50">
        <h3 className="font-semibold text-gray-900">Task Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h2>
          {task.description && (
            <p className="text-gray-600 text-sm">{task.description}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">STATUS</label>
          {isEditing ? (
            <div className="flex gap-2">
              <select
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
                <option value="blocked">Blocked</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-sm rounded-full ${statusColors[task.status]}`}>
                {task.status}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="space-y-3 pt-2">
          {task.priority && (
            <div className="flex items-center gap-2 text-sm">
              <Flag className={`w-4 h-4 ${priorityColors[task.priority]}`} />
              <span className="text-gray-600">Priority:</span>
              <span className={`font-medium ${priorityColors[task.priority]}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
          )}

          {task.assignedTo && (
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Assigned to:</span>
              <span className="font-medium text-gray-900">{task.assignedTo.name}</span>
            </div>
          )}

          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Due:</span>
              <span className="font-medium text-gray-900">
                {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              </span>
            </div>
          )}

          {task.estimatedHours && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Estimated:</span>
              <span className="font-medium text-gray-900">{task.estimatedHours}h</span>
            </div>
          )}

          {task.project && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Project:</span>
              <span className="font-medium text-gray-900">{task.project.name}</span>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <h4 className="font-medium text-gray-900">Comments ({comments.length})</h4>
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
            <button
              type="submit"
              disabled={!commentText.trim() || addCommentMutation.isLoading}
              className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addCommentMutation.isLoading ? 'Adding...' : 'Add Comment'}
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-900">
                    {comment.author.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(comment.createdAt), 'MMM dd, HH:mm')}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t flex gap-2">
          <button
            onClick={() => onDelete(task._id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
