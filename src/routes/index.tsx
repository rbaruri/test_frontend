import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Public Pages
import Landing from '../pages/landing/Landing';
import Login from '../pages/authorization/Login';
import Signup from '../pages/authorization/Signup';

// Protected Pages
import Home from '../pages/home/Home';
import SyllabusUpload from '../pages/syllabus/SyllabusUpload';
import LearningPath from '../pages/learningpath/LearningPath';
import ModuleDetail from '../pages/learningpath/ModuleDetail';
import Progress from '../pages/progress/Progress';
import Account from '../pages/account/Account';

// Layout Components
import Navbar from '../components/navbar/Navbar';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" replace /> : <Landing />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/home" replace /> : <Signup />}
      />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <SyllabusUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning-path"
        element={
          <ProtectedRoute>
            <LearningPath />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning-path/:moduleId"
        element={
          <ProtectedRoute>
            <ModuleDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 