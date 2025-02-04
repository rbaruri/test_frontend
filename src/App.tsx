import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import SyllabusUpload from './pages/syllabus/SyllabusUpload';
import LearningPath from './pages/learningpath/LearningPath';
import Progress from './pages/progress/Progress';
import Account from './pages/account/Account';
import Login from './pages/authorization/Login';
import Signup from './pages/authorization/Signup';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/syllabus-upload" element={<SyllabusUpload />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
