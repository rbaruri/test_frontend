import React, { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";

interface FocusTimerProps {
  onClose: () => void;
}

const FocusTimer = ({ onClose }: FocusTimerProps) => {
  const [isLocked, setIsLocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [inputDuration, setInputDuration] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (!timerActive) return; // Prevent effect from running if the timer hasn't started

    setIsLocked(true);
    setTimeRemaining(inputDuration);

    let timer = setTimeout(() => {
      setIsLocked(false);
      setTimerActive(false);
    }, inputDuration * 1000);

    let interval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Stay focused! You cannot switch tabs until the timer ends.");
        document.title = "⚠️ Focus Lock Active!";
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "You cannot leave this page yet!";
    };

    const handleBlur = () => {
      alert("Don't lose focus! Stay on this tab.");
      window.focus();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("blur", handleBlur);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("blur", handleBlur);
    };
  }, [timerActive, inputDuration]); // Removed isLocked from dependencies

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!timerActive ? (
        <>
          <h2>Set Focus Timer</h2>
          <input
            type="number"
            value={inputDuration}
            onChange={(e) => setInputDuration(Math.max(Number(e.target.value), 1))}
            min={1}
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button onClick={() => setTimerActive(true)}>Start Focus Lock</button>
        </>
      ) : (
        <FocusLock disabled={!isLocked}>
          <h2>Focus Locked!</h2>
          <p>You must stay on this page for {timeRemaining} seconds.</p>
          {timeRemaining === 0 && (
            <button onClick={onClose}>Unlock & Close</button>
          )}
        </FocusLock>
      )}
    </div>
  );
};

export default FocusTimer;
