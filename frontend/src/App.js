import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProjectList from './components/Project/ProjectList';
import ProjectForm from './components/Project/ProjectForm';
import TaskList from './components/Task/TaskList';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/projects" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/projects" /> : <Signup />}
        />
        <Route
          path="/projects"
          element={isAuthenticated ? <ProjectList /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/new"
          element={isAuthenticated ? <ProjectForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/:projectId"
          element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/projects" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;