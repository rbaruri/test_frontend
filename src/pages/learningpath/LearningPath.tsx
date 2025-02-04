import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./LearningPath.css";

interface Module {
  id: number;
  topic: string;
  status: 'Not Started' | 'In Progress' | 'Quiz Pending' | 'Completed';
  description: string;
  estimatedTime: string;
  quizScore?: number;
  completionDate?: string;
}

const LearningPath = () => {
  const { isAuthenticated } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      // This will be replaced with actual API call
      const mockModules: Module[] = [
        {
          id: 1,
          topic: "Introduction to AI",
          description: "Basic concepts and foundations of Artificial Intelligence",
          estimatedTime: "2 hours",
          status: "Completed",
          quizScore: 90,
          completionDate: "2024-02-01"
        },
        {
          id: 2,
          topic: "Supervised Learning",
          description: "Understanding supervised learning algorithms and applications",
          estimatedTime: "3 hours",
          status: "Quiz Pending"
        },
        {
          id: 3,
          topic: "Unsupervised Learning",
          description: "Clustering and dimensionality reduction techniques",
          estimatedTime: "2.5 hours",
          status: "In Progress"
        },
        {
          id: 4,
          topic: "Deep Learning",
          description: "Neural networks and deep learning architectures",
          estimatedTime: "4 hours",
          status: "Not Started"
        },
      ];
      setModules(mockModules);
      
      // Calculate overall progress
      const completed = mockModules.filter(m => m.status === 'Completed').length;
      setOverallProgress((completed / mockModules.length) * 100);
    }
  }, [isAuthenticated]);

  const getStatusColor = (status: Module['status']) => {
    const colors = {
      'Not Started': '#6c757d',
      'In Progress': '#007bff',
      'Quiz Pending': '#ffc107',
      'Completed': '#28a745'
    };
    return colors[status];
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-message">
        <p>Please log in to access your learning path.</p>
      </div>
    );
  }

  return (
    <div className="learning-path-container">
      <div className="learning-path-header">
        <h1>Your Learning Journey</h1>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(overallProgress)}% Complete</span>
        </div>
      </div>

      <div className="modules-grid">
        {modules.map((module) => (
          <Link 
            to={`/learning-path/${module.id}`} 
            key={module.id}
            className="module-card"
          >
            <div className="module-content">
              <h3>{module.topic}</h3>
              <p>{module.description}</p>
              <div className="module-details">
                <span className="estimated-time">
                  <i className="far fa-clock"></i> {module.estimatedTime}
                </span>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(module.status) }}
                >
                  {module.status}
                </span>
              </div>
              {module.quizScore && (
                <div className="quiz-score">
                  Quiz Score: {module.quizScore}%
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
