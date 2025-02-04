import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import SyllabusUpload from './pages/syllabus/SyllabusUpload';
import LearningPath from './pages/learningpath/LearningPath';
import ModuleDetail from './pages/learningpath/ModuleDetail';
import Progress from './pages/progress/Progress';
import Account from './pages/account/Account';
import Login from './pages/authorization/Login';
import Signup from './pages/authorization/Signup';
import Navbar from './components/navbar/Navbar';
import Quiz from './components/Quiz';
import PrivateRoutes from './components/PrivateRoutes';
import './App.css';
import Landing from './pages/landing/Landing';
import Header from './components/header/Header';

const App = () => {
  const location = useLocation();
  const showHeader = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      {showHeader && <Header />}
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes (Require Login) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/syllabus-upload" element={<SyllabusUpload />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/learning-path/:moduleId" element={<ModuleDetail />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/account" element={<Account />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
