import React, { useState, useEffect, useCallback } from 'react';
import './SecureQuiz.css';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface SecureQuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onExit: () => void;
}

const SecureQuiz: React.FC<SecureQuizProps> = ({ questions, onComplete, onExit }) => {
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [warningCount, setWarningCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions.length * 120); // 2 minutes per question

  const handleQuizSubmit = useCallback(() => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.reduce((acc, question, index) => {
      return acc + (question.correctAnswer === answers[index] ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    onComplete(score);
  }, [questions, answers, onComplete]);

  const handleTabSwitch = useCallback(() => {
    setWarningCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        handleQuizSubmit(); // Auto-submit after 3 warnings
        return prev;
      }
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return newCount;
    });
  }, [handleQuizSubmit]);

  useEffect(() => {
    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleTabSwitch();
      }
    };

    // Handle window focus
    const handleFocus = () => {
      // Do nothing when window gains focus
    };

    const handleBlur = () => {
      handleTabSwitch();
    };

    // Handle fullscreen change
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleTabSwitch();
      }
    };

    // Set up event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Request fullscreen
    document.documentElement.requestFullscreen().catch((err) => {
      console.error('Error attempting to enable fullscreen:', err);
    });

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleQuizSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      clearInterval(timer);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.error('Error attempting to exit fullscreen:', err);
        });
      }
    };
  }, [handleTabSwitch, handleQuizSubmit]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="secure-quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="quiz-timer">
          Time Remaining: {formatTime(timeLeft)}
        </div>
      </div>

      {showWarning && (
        <div className="warning-message">
          Warning! Attempting to leave the quiz area. {3 - warningCount} warnings remaining.
        </div>
      )}

      <div className="question-container">
        <h3>{questions[currentQuestion].question}</h3>
        <div className="options-container">
          {questions[currentQuestion].options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={answers[currentQuestion] === index}
                onChange={() => handleAnswer(index)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="nav-button"
        >
          Previous
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button 
            onClick={handleQuizSubmit}
            disabled={answers.length !== questions.length}
            className="submit-button"
          >
            Submit Quiz
          </button>
        ) : (
          <button 
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            className="nav-button"
          >
            Next
          </button>
        )}
      </div>

      <button onClick={onExit} className="exit-button">
        Exit Quiz
      </button>
    </div>
  );
};

export default SecureQuiz; 