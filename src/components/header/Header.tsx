import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="nav-brand">
          LearningPath
        </Link>

        <div className="nav-links">
          {isAuthPage ? (
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i> Home
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/signup" className="nav-button">
                <i className="fas fa-user-plus"></i> Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
