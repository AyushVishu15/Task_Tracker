import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TaskList() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null); // Track task being edited

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data);
        } else {
          setError(data.message || 'Failed to fetch tasks');
        }
      } catch (err) {
        setError('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !description.trim() || !projectId) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          projectId,
          status,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTasks([...tasks, data]);
        setTitle('');
        setDescription('');
        setStatus('To Do');
      } else {
        setError(data.message || 'Failed to create task');
      }
    } catch (err) {
      setError('Server error: Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(tasks.map((task) => (task._id === taskId ? data : task)));
        setEditingTask(null); // Clear edit mode
        setTitle('');
        setDescription('');
        setStatus('To Do');
      } else {
        setError(data.message || 'Failed to update task');
      }
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        setError(data.message || 'Failed to delete task');
      }
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !description.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    await handleUpdateTask(editingTask, {
      title: title.trim(),
      description: description.trim(),
      status,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={editingTask ? handleEditSubmit : handleCreateTask} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="p-2 border rounded mr-2"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded mr-2"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={() => {
              setEditingTask(null);
              setTitle('');
              setDescription('');
              setStatus('To Do');
            }}
            className="bg-gray-500 text-white p-2 rounded ml-2"
          >
            Cancel
          </button>
        )}
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-2 p-2 border rounded">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
            {task.completedAt && (
              <p>Completed: {new Date(task.completedAt).toLocaleString()}</p>
            )}
            <button
              onClick={() => handleEditTask(task)}
              className="bg-green-500 text-white p-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() =>
                handleUpdateTask(task._id, {
                  status: task.status === 'Done' ? 'In Progress' : 'Done',
                })
              }
              className="bg-yellow-500 text-white p-1 rounded mr-2"
            >
              Toggle Status
            </button>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
