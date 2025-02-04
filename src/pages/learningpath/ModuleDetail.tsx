import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FocusTimer from "../../components/FocusTimer"; // Your existing Focus Timer component

const ModuleDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [showTimer, setShowTimer] = useState(false);

  const modules = [
    { id: 1, topic: "Introduction to AI", content: "Learn about AI fundamentals..." },
    { id: 2, topic: "Supervised Learning", content: "Explore supervised learning algorithms..." },
    { id: 3, topic: "Unsupervised Learning", content: "Understand clustering and dimensionality reduction..." },
    { id: 4, topic: "Deep Learning", content: "Dive into neural networks and deep learning models..." },
  ];

  const module = modules.find((mod) => mod.id.toString() === moduleId);

  if (!module) {
    return <p>Module not found.</p>;
  }

  return (
    <div>
      <h1>{module.topic}</h1>
      <p>{module.content}</p>
      <button onClick={() => setShowTimer(true)}>Start Module</button>
      {showTimer && <FocusTimer onClose={() => setShowTimer(false)} />}
    </div>
  );
};

export default ModuleDetail;
