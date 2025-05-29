import { useEffect, useState } from "react";
import "./Timer.css";

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
  isRunning: boolean;
}

const Timer = ({ duration, onTimeUp, isRunning }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60); // Convert to seconds

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);

  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getTimerColorClass = () => {
    const percentage = (timeLeft / (duration * 60)) * 100;
    if (percentage > 50) return "green";
    if (percentage > 25) return "yellow";
    return "red";
  };

  return (
    <div className="timer-container">
      <span className="timer-icon">⏱️</span>
      <span className={`timer-display ${getTimerColorClass()}`}>
        {formatTime(timeLeft)}
      </span>
      {!isRunning && <span className="timer-paused">(Paused)</span>}
    </div>
  );
};

export default Timer;
