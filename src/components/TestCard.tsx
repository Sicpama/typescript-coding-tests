import React from "react";
import type { Test } from "../types";
import "./TestCard.css";

interface TestCardProps {
  testId: number;
  test: Test;
  onStartTest: (testId: number) => void;
}

const TestCard: React.FC<TestCardProps> = ({ testId, test, onStartTest }) => {
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "difficulty-easy";
      case "medium":
        return "difficulty-medium";
      case "hard":
        return "difficulty-hard";
      default:
        return "difficulty-medium";
    }
  };

  const getIcon = (testId: number) => {
    const icons = ["📝", "🏗️", "🧠", "🔄", "🌳", "🔮", "⚙️", "🚀"];
    return icons[testId - 1] || "📝";
  };

  return (
    <div className="test-card">
      <div className="test-card-header">
        <div className="test-card-title-section">
          <span className="test-card-icon">{getIcon(testId)}</span>
          <h3 className="test-card-title">{test.title}</h3>
        </div>
        <span className={getDifficultyClass(test.difficulty)}>
          {test.difficulty}
        </span>
      </div>

      <div className="test-card-info">
        <div className="test-card-info-item">
          <span className="test-card-info-text">
            ⏱️ Duration: ~{test.duration} minutes
          </span>
        </div>
        <div className="test-card-info-item">
          <span className="test-card-info-text">
            📊 Questions: {test.questions.length}
          </span>
        </div>
      </div>

      <button
        onClick={() => onStartTest(testId)}
        className="btn-primary test-card-button"
      >
        Start Test
      </button>
    </div>
  );
};

export default TestCard;
