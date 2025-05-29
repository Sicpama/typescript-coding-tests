import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TestCard from "./components/TestCard";
import TestInterface from "./components/TestInterface";
import { testData } from "./data/tests";
import type { Test } from "./types";

function App() {
  const [currentTest, setCurrentTest] = useState<Test | null>(null);

  const handleStartTest = (testId: number) => {
    const test = testData[testId];
    if (test) {
      setCurrentTest(test);
    }
  };

  const handleFinishTest = () => {
    alert(
      "Test completed! In a real implementation, this would save your results."
    );
    setCurrentTest(null);
  };

  const handleBackToHome = () => {
    setCurrentTest(null);
  };

  if (currentTest) {
    return (
      <TestInterface
        test={currentTest}
        onFinishTest={handleFinishTest}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <div className="app-container">
      <Header />

      <main className="app-main">
        {/* Intro Section */}
        <div className="app-intro">
          <h2 className="app-intro-title">
            Welcome to TypeScript Coding Tests
          </h2>
          <p className="app-intro-text">
            Test your TypeScript programming skills with our carefully curated
            coding challenges. Each test is designed to take approximately 15
            minutes and covers different aspects of software engineering.
          </p>
        </div>

        {/* Stats */}
        <div className="app-stats">
          <div className="app-stat-item">
            <div className="app-stat-icon">📝</div>
            <h3 className="app-stat-number">8 Tests</h3>
            <p className="app-stat-text">Various difficulty levels</p>
          </div>
          <div className="app-stat-item">
            <div className="app-stat-icon">⏱️</div>
            <h3 className="app-stat-number">15 Minutes</h3>
            <p className="app-stat-text">Per test average</p>
          </div>
          <div className="app-stat-item">
            <div className="app-stat-icon">🏆</div>
            <h3 className="app-stat-number">Real-world</h3>
            <p className="app-stat-text">Practical scenarios</p>
          </div>
        </div>

        {/* Test Cards Grid */}
        <div className="app-test-grid">
          {Object.entries(testData).map(([testId, test]) => (
            <TestCard
              key={testId}
              testId={Number(testId)}
              test={test}
              onStartTest={handleStartTest}
            />
          ))}
        </div>
      </main>

      <footer className="app-footer">
        <div className="app-footer-content">
          <div className="app-footer-text">
            <p>
              &copy; 2025 TypeScript Coding Tests. Built for software engineers
              by software engineers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
