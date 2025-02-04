import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { AuthProvider } from './context/AuthContext';
import PrivateRoutes from './components/PrivateRoutes';
import './App.css';
import Landing from './pages/landing/Landing';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
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
              <Route path="/learning-path/:moduleId" element={<ModuleDetail />} /> {/* New Route */}
              <Route path="/progress" element={<Progress />} />
              <Route path="/account" element={<Account />} />
              <Route path="/quiz" element={<Quiz />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
