import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(' ')[0] || 'User';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', emoji: '🌅' };
    if (hour < 17) return { text: 'Good Afternoon', emoji: '☀️' };
    return { text: 'Good Evening', emoji: '🌙' };
  };

  const { text: greeting, emoji } = getGreeting();

  return (
    <div className="home-container">
      <section className="greeting-section">
        <h1>
          {greeting}, {firstName} {emoji}
        </h1>
        <p>Welcome back to your personalized learning dashboard</p>
      </section>

      <section className="quick-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Overall Progress</h3>
            <div className="stat-value">75%</div>
            <div className="stat-progress">
              <div className="progress-bar" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="stat-card">
            <h3>Study Streak</h3>
            <div className="stat-value">5 days 🔥</div>
            <p>Keep it up!</p>
          </div>

          <div className="stat-card">
            <h3>Time Today</h3>
            <div className="stat-value">2h 15m</div>
            <p>Daily goal: 3h</p>
          </div>

          <div className="stat-card">
            <h3>Next Quiz</h3>
            <div className="stat-value">Module 3</div>
            <p>Available now</p>
          </div>
        </div>
      </section>

      <section className="action-cards">
        <div className="action-grid">
          <Link to="/upload" className="action-card">
            <div className="action-icon">📚</div>
            <h3>Upload New Syllabus</h3>
            <p>Add a new course to your learning path</p>
          </Link>

          <Link to="/learning-path" className="action-card">
            <div className="action-icon">🎯</div>
            <h3>Continue Learning</h3>
            <p>Resume from where you left off</p>
          </Link>

          <Link to="/progress" className="action-card">
            <div className="action-icon">📊</div>
            <h3>View Progress</h3>
            <p>Track your learning journey</p>
          </Link>

          <Link to="/quiz" className="action-card">
            <div className="action-icon">✍️</div>
            <h3>Take a Quiz</h3>
            <p>Test your knowledge</p>
          </Link>
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">✅</div>
            <div className="activity-content">
              <h4>Completed Module 2 Quiz</h4>
              <p>Score: 90% • 2 hours ago</p>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <h4>Study Session</h4>
              <p>Module 3: Advanced Concepts • Yesterday</p>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon">🎯</div>
            <div className="activity-content">
              <h4>Started New Module</h4>
              <p>Module 3: Advanced Concepts • 2 days ago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
