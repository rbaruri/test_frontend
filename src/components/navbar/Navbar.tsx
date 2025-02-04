import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Don't show navbar on auth pages
  if (['/login', '/signup', '/'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1 className="logo">LearningPath</h1>
        <button
          className="collapse-btn"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          <i className={`fas fa-chevron-${isSidebarCollapsed ? 'right' : 'left'}`}></i>
        </button>
      </div>

      <div className="sidebar-nav">
        {user ? (
          <>
            <Link
              to="/home"
              className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>

            <Link
              to="/syllabus-upload"
              className={`nav-item ${location.pathname === '/syllabus-upload' ? 'active' : ''}`}
            >
              <i className="fas fa-upload"></i>
              <span>Upload Syllabus</span>
            </Link>

            <Link
              to="/learning-path"
              className={`nav-item ${location.pathname === '/learning-path' ? 'active' : ''}`}
            >
              <i className="fas fa-road"></i>
              <span>Learning Path</span>
            </Link>

            <Link
              to="/progress"
              className={`nav-item ${location.pathname === '/progress' ? 'active' : ''}`}
            >
              <i className="fas fa-chart-line"></i>
              <span>Progress</span>
            </Link>

            <Link
              to="/account"
              className={`nav-item ${location.pathname === '/account' ? 'active' : ''}`}
            >
              <i className="fas fa-user"></i>
              <span>Account</span>
            </Link>

            <button onClick={handleLogout} className="nav-item logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
