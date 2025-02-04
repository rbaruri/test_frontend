import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Progress.css";

interface ProgressStats {
  modulesCompleted: number;
  totalModules: number;
  averageQuizScore: number;
  studyTimeHours: number;
  streakDays: number;
}

interface ModuleProgress {
  id: number;
  name: string;
  completion: number;
  quizScore?: number;
  lastAccessed: string;
}

type TimeRange = 'daily' | 'weekly' | 'monthly';

const Progress = () => {
  const { isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [stats, setStats] = useState<ProgressStats>({
    modulesCompleted: 0,
    totalModules: 0,
    averageQuizScore: 0,
    studyTimeHours: 0,
    streakDays: 0
  });
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      // Mock data - replace with actual API calls
      const mockStats: ProgressStats = {
        modulesCompleted: 8,
        totalModules: 12,
        averageQuizScore: 85,
        studyTimeHours: 24,
        streakDays: 5
      };

      const mockModules: ModuleProgress[] = [
        {
          id: 1,
          name: "Introduction to AI",
          completion: 100,
          quizScore: 90,
          lastAccessed: "2024-02-03"
        },
        {
          id: 2,
          name: "Supervised Learning",
          completion: 75,
          lastAccessed: "2024-02-04"
        },
        {
          id: 3,
          name: "Unsupervised Learning",
          completion: 50,
          lastAccessed: "2024-02-04"
        },
        {
          id: 4,
          name: "Deep Learning",
          completion: 25,
          lastAccessed: "2024-02-04"
        }
      ];

      setStats(mockStats);
      setModuleProgress(mockModules);
    }
  }, [isAuthenticated]);

  const getProgressData = () => {
    // Mock data for different time ranges
    const data = {
      daily: [
        { label: "Mon", value: 2 },
        { label: "Tue", value: 3 },
        { label: "Wed", value: 1 },
        { label: "Thu", value: 4 },
        { label: "Fri", value: 2 },
        { label: "Sat", value: 0 },
        { label: "Sun", value: 1 }
      ],
      weekly: [
        { label: "Week 1", value: 8 },
        { label: "Week 2", value: 12 },
        { label: "Week 3", value: 15 },
        { label: "Week 4", value: 10 }
      ],
      monthly: [
        { label: "Jan", value: 45 },
        { label: "Feb", value: 30 }
      ]
    };

    return data[timeRange];
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-message">
        Please log in to view your progress.
      </div>
    );
  }

  return (
    <div className="progress-container">
      <h1>Learning Progress</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <div className="stat-value">
            {Math.round((stats.modulesCompleted / stats.totalModules) * 100)}%
          </div>
          <div className="stat-detail">
            {stats.modulesCompleted} of {stats.totalModules} modules
          </div>
        </div>

        <div className="stat-card">
          <h3>Average Quiz Score</h3>
          <div className="stat-value">{stats.averageQuizScore}%</div>
          <div className="stat-detail">Across all modules</div>
        </div>

        <div className="stat-card">
          <h3>Study Time</h3>
          <div className="stat-value">{stats.studyTimeHours}h</div>
          <div className="stat-detail">Total hours spent</div>
        </div>

        <div className="stat-card">
          <h3>Learning Streak</h3>
          <div className="stat-value">{stats.streakDays} days</div>
          <div className="stat-detail">Keep it up!</div>
        </div>
      </div>

      <div className="progress-chart-section">
        <div className="chart-header">
          <h2>Progress Overview</h2>
          <div className="time-range-selector">
            <button 
              className={timeRange === 'daily' ? 'active' : ''} 
              onClick={() => setTimeRange('daily')}
            >
              Daily
            </button>
            <button 
              className={timeRange === 'weekly' ? 'active' : ''} 
              onClick={() => setTimeRange('weekly')}
            >
              Weekly
            </button>
            <button 
              className={timeRange === 'monthly' ? 'active' : ''} 
              onClick={() => setTimeRange('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="progress-chart">
          {getProgressData().map((item, index) => (
            <div key={index} className="chart-bar">
              <div 
                className="bar-fill" 
                style={{ height: `${(item.value / Math.max(...getProgressData().map(d => d.value))) * 100}%` }}
              >
                <span className="bar-value">{item.value}</span>
              </div>
              <span className="bar-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="modules-progress-section">
        <h2>Module Progress</h2>
        <div className="modules-grid">
          {moduleProgress.map((module) => (
            <div key={module.id} className="module-progress-card">
              <h3>{module.name}</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${module.completion}%` }}
                ></div>
              </div>
              <div className="module-stats">
                <span>Completion: {module.completion}%</span>
                {module.quizScore && (
                  <span>Quiz Score: {module.quizScore}%</span>
                )}
                <span>Last Accessed: {new Date(module.lastAccessed).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
