import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ProjectList() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProjects(data);
        } else {
          setError(data.message || 'Failed to fetch projects');
        }
      } catch (err) {
        setError('Failed to fetch projects');
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProjects(projects.filter((project) => project._id !== projectId));
      } else {
        setError(data.message || 'Failed to delete project');
      }
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Link to="/projects/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">
        Create New Project
      </Link>
      <ul>
        {projects.map((project) => (
          <li key={project._id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <h3 className="font-bold text-lg mr-2">{project.title}</h3>
                <Link
                  to={`/projects/${project._id}`}
                  className="bg-blue-500 text-white p-1 rounded text-sm hover:bg-blue-600"
                >
                  View Tasks
                </Link>
              </div>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <button
              onClick={() => handleDelete(project._id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;