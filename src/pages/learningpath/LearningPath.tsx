import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const LearningPath = () => {
  const { isAuthenticated } = useAuth();
  const [learningPath, setLearningPath] = useState<{ id: number; topic: string; status: string }[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const mockPath = [
        { id: 1, topic: "Introduction to AI", status: "Incomplete" },
        { id: 2, topic: "Supervised Learning", status: "Incomplete" },
        { id: 3, topic: "Unsupervised Learning", status: "Incomplete" },
        { id: 4, topic: "Deep Learning", status: "Incomplete" },
      ];
      setLearningPath(mockPath);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Please log in to access your learning path.</p>;
  }

  return (
    <div>
      <h1>Your Personalized Learning Path</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {learningPath.map((item) => (
            <tr key={item.id}>
              <td>
                <Link to={`/learning-path/${item.id}`}>{item.topic}</Link>
              </td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LearningPath;
