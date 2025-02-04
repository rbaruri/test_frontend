import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Progress.css";

const Progress = () => {
  const { isAuthenticated } = useAuth();
  const [progressData, setProgressData] = useState<{ week: string; completion: number }[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const mockProgress = [
        { week: "Week 1", completion: 20 },
        { week: "Week 2", completion: 40 },
        { week: "Week 3", completion: 60 },
        { week: "Week 4", completion: 80 },
      ];
      setProgressData(mockProgress);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p className="login-message">Please log in to view your progress.</p>;
  }

  return (
    <div className="progress-container">
      <h1>Your Learning Progress</h1>
      <table className="progress-table">
        <thead>
          <tr>
            <th>Week</th>
            <th>Completion (%)</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map((progress, index) => (
            <tr key={index}>
              <td>{progress.week}</td>
              <td>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress.completion}%` }}></div>
                </div>
                {progress.completion}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Progress;
