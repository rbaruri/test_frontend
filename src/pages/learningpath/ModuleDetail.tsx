import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SecureQuiz from "../../components/SecureQuiz";
import "./ModuleDetail.css";

interface ModuleContent {
  id: number;
  topic: string;
  content: string;
  estimatedTime: string;
  quiz: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

const ModuleDetail = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [showTimer, setShowTimer] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Mock module data - this would come from your backend
  const module: ModuleContent = {
    id: parseInt(moduleId || "0"),
    topic: "Introduction to AI",
    content: `
      <h2>Introduction to Artificial Intelligence</h2>
      <p>Artificial Intelligence (AI) is a broad field of computer science focused on creating intelligent machines that can perform tasks that typically require human intelligence.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li>Machine Learning</li>
        <li>Neural Networks</li>
        <li>Natural Language Processing</li>
        <li>Computer Vision</li>
      </ul>
      
      <h3>Learning Objectives</h3>
      <ol>
        <li>Understand the basic concepts of AI</li>
        <li>Learn about different types of AI systems</li>
        <li>Explore real-world applications of AI</li>
      </ol>
    `,
    estimatedTime: "45 minutes",
    quiz: {
      questions: [
        {
          question: "What is the main goal of Artificial Intelligence?",
          options: [
            "To replace human workers",
            "To create intelligent machines that can perform human-like tasks",
            "To make computers faster",
            "To store more data"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of these is NOT a branch of AI?",
          options: [
            "Machine Learning",
            "Natural Language Processing",
            "Database Management",
            "Computer Vision"
          ],
          correctAnswer: 2
        },
        {
          question: "What is a key characteristic of AI systems?",
          options: [
            "They can only work offline",
            "They require human supervision for every task",
            "They can learn from experience",
            "They only work with numbers"
          ],
          correctAnswer: 2
        }
      ]
    }
  };

  const handleTimerComplete = () => {
    setTimerComplete(true);
    setShowTimer(false);
    setShowQuiz(true);
  };

  const handleQuizComplete = (quizScore: number) => {
    setScore(quizScore);
    setQuizSubmitted(true);
  };

  const handleQuizExit = () => {
    if (window.confirm('Are you sure you want to exit the quiz? Your progress will be lost.')) {
      setShowQuiz(false);
      setTimerComplete(false);
    }
  };

  const FocusTimer: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
      if (!isPaused && timeLeft > 0) {
        const timer = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
      } else if (timeLeft === 0) {
        onComplete();
      }
    }, [timeLeft, isPaused, onComplete]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
      <div className="focus-timer">
        <h3>Focus Timer</h3>
        <div className="timer-display">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="timer-controls">
          <button onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={onComplete}>Skip Timer</button>
        </div>
      </div>
    );
  };

  if (!module) {
    return <div className="module-error">Module not found.</div>;
  }

  return (
    <div className="module-detail-container">
      <button className="back-button" onClick={() => navigate('/learning-path')}>
        ← Back to Learning Path
      </button>

      <div className="module-content">
        <h1>{module.topic}</h1>
        
        {!showTimer && !timerComplete && !showQuiz && (
          <div className="start-section">
            <p>Estimated time: {module.estimatedTime}</p>
            <button className="primary-button" onClick={() => setShowTimer(true)}>
              Start Learning Session
            </button>
          </div>
        )}

        {showTimer && (
          <FocusTimer onComplete={handleTimerComplete} />
        )}

        {!showQuiz && (
          <div className="content-section" 
               dangerouslySetInnerHTML={{ __html: module.content }} />
        )}

        {showQuiz && !quizSubmitted && (
          <SecureQuiz
            questions={module.quiz.questions}
            onComplete={handleQuizComplete}
            onExit={handleQuizExit}
          />
        )}

        {quizSubmitted && (
          <div className="quiz-results">
            <h3>Quiz Results</h3>
            <div className="score">
              Your Score: {score}%
            </div>
            {score >= 70 ? (
              <div className="success-message">
                Congratulations! You've passed this module.
                <button
                  className="primary-button"
                  onClick={() => navigate('/learning-path')}
                >
                  Continue to Next Module
                </button>
              </div>
            ) : (
              <div className="failure-message">
                You need a score of 70% or higher to pass. Please review the material and try again.
                <button
                  className="primary-button"
                  onClick={() => {
                    setQuizSubmitted(false);
                    setShowQuiz(false);
                    setTimerComplete(false);
                  }}
                >
                  Review and Retry
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDetail;
