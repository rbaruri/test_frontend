import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    navigate("/login");
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
