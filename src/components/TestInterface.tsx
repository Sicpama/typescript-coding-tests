import React, { useEffect, useState } from "react";
import type { CodeExecutionResult, Test } from "../types";
import { runTests } from "../utils/testRunner";
import CodeEditor from "./CodeEditor";
import "./TestInterface.css";
import TestResults from "./TestResults";
import Timer from "./Timer";

interface TestInterfaceProps {
  test: Test;
  onFinishTest: () => void;
  onBackToHome: () => void;
}

const TestInterface: React.FC<TestInterfaceProps> = ({
  test,
  onFinishTest,
  onBackToHome,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [testResult, setTestResult] = useState<CodeExecutionResult | null>(
    null
  );
  const [isRunningTests, setIsRunningTests] = useState(false);

  const currentQuestion = test.questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      setUserCode(currentQuestion.template);
      setTestResult(null); // Reset test results when changing questions
    }
  }, [currentQuestion]);

  const handleTimeUp = () => {
    setIsTimerRunning(false);
    alert("Time is up! You can continue working but the timer has stopped.");
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowSolution(false);
      setTestResult(null);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowSolution(false);
      setTestResult(null);
    }
  };

  const handleRunTests = async () => {
    if (!currentQuestion || !userCode.trim()) {
      alert("Please write some code before running tests.");
      return;
    }

    setIsRunningTests(true);
    setTestResult(null);

    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const result = runTests(userCode, currentQuestion.testCases);
      setTestResult(result);

      // Show success message if all tests pass
      if (result.success && result.results.every((r) => r.passed)) {
        setTimeout(() => {
          alert(
            "🎉 Congratulations! All tests passed! You can move to the next question or continue refining your solution."
          );
        }, 100);
      }
    } catch (error) {
      setTestResult({
        success: false,
        results: [],
        compilationError:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsRunningTests(false);
    }
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  return (
    <div className="test-interface-container">
      {/* Header */}
      <div className="test-interface-header">
        <div className="test-interface-header-content">
          <div className="test-interface-header-flex">
            <div className="test-interface-header-left">
              <button onClick={onBackToHome} className="btn-secondary">
                ← Back to Tests
              </button>
              <h1 className="test-interface-title">{test.title}</h1>
            </div>

            <div className="test-interface-header-right">
              <Timer
                duration={test.duration}
                onTimeUp={handleTimeUp}
                isRunning={isTimerRunning}
              />
              <span className="test-interface-question-counter">
                Question {currentQuestionIndex + 1} of {test.questions.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="test-interface-main">
        <div className="test-interface-grid">
          {/* Problem Description */}
          <div className="test-interface-section">
            <div className="card">
              <h2 className="test-interface-question-title">
                {currentQuestion.title}
              </h2>

              <div className="test-interface-content">
                <div>
                  <h3 className="test-interface-section-title">Description</h3>
                  <p className="test-interface-description">
                    {currentQuestion.description}
                  </p>
                </div>

                <div>
                  <h3 className="test-interface-section-title">Example</h3>
                  <pre className="test-interface-example">
                    {currentQuestion.example}
                  </pre>
                </div>

                {currentQuestion.testCases.length > 0 && (
                  <div>
                    <h3 className="test-interface-section-title">Test Cases</h3>
                    <div className="test-interface-test-cases">
                      {currentQuestion.testCases.map((testCase) => (
                        <div
                          key={`${testCase.input}-${testCase.expected}`}
                          className="test-interface-test-case"
                        >
                          <div>
                            <strong>Input:</strong> {testCase.input}
                          </div>
                          <div>
                            <strong>Expected:</strong> {testCase.expected}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="test-interface-navigation">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`btn-secondary ${
                  currentQuestionIndex === 0 ? "btn-disabled" : ""
                }`}
              >
                ← Previous
              </button>

              <div className="test-interface-nav-buttons">
                <button
                  onClick={toggleSolution}
                  className="btn-secondary btn-sm"
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </button>
                <button onClick={onFinishTest} className="btn-primary btn-sm">
                  Finish Test
                </button>
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === test.questions.length - 1}
                className={`btn-secondary ${
                  currentQuestionIndex === test.questions.length - 1
                    ? "btn-disabled"
                    : ""
                }`}
              >
                Next →
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="test-interface-section">
            <div className="card">
              <div className="test-interface-editor-header">
                <h3 className="test-interface-editor-title">Your Solution</h3>
                <button
                  onClick={handleRunTests}
                  className="btn-primary btn-sm"
                  disabled={isRunningTests}
                >
                  {isRunningTests ? "Running..." : "Run Tests"}
                </button>
              </div>

              <CodeEditor
                value={userCode}
                onChange={setUserCode}
                height="400px"
              />
            </div>

            {/* Test Results */}
            <div className="card">
              <TestResults result={testResult} isLoading={isRunningTests} />
            </div>

            {showSolution && (
              <div className="card">
                <h3 className="test-interface-solution-title">Solution</h3>
                <CodeEditor
                  value={currentQuestion.solution}
                  onChange={() => {}} // Read-only
                  height="300px"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInterface;
