import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        {isAuthenticated && (
          <>
            <li><Link to="/syllabus-upload">Syllabus Upload</Link></li>
            <li><Link to="/learning-path">Learning Path</Link></li>
            <li><Link to="/progress">Progress</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><button onClick={handleLogout}>Sign Out</button></li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
