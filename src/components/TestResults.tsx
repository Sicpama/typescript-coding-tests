import React from "react";
import type { CodeExecutionResult } from "../types";
import "./TestResults.css";

interface TestResultsProps {
  result: CodeExecutionResult | null;
  isLoading: boolean;
}

const TestResults: React.FC<TestResultsProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="test-results-container">
        <div className="test-results-header">
          <h3>Running Tests...</h3>
        </div>
        <div className="test-results-loading">
          <div className="loading-spinner"></div>
          <span>Executing your code...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="test-results-container">
        <div className="test-results-header">
          <h3>Test Results</h3>
        </div>
        <div className="test-results-empty">
          <p>Click "Run Tests" to execute your code and see the results.</p>
        </div>
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="test-results-container">
        <div className="test-results-header">
          <h3>Compilation Error</h3>
        </div>
        <div className="test-results-error">
          <div className="error-message">
            <strong>Error:</strong> {result.compilationError}
          </div>
          <p className="error-hint">
            Please check your code syntax and try again.
          </p>
        </div>
      </div>
    );
  }

  const passedTests = result.results.filter((r) => r.passed).length;
  const totalTests = result.results.length;
  const allPassed = passedTests === totalTests;

  return (
    <div className="test-results-container">
      <div className="test-results-header">
        <h3>Test Results</h3>
        <div
          className={`test-results-summary ${
            allPassed ? "success" : "partial"
          }`}
        >
          {passedTests}/{totalTests} tests passed
        </div>
      </div>

      <div className="test-results-list">
        {result.results.map((testResult, index) => (
          <div
            key={index}
            className={`test-result-item ${
              testResult.passed ? "passed" : "failed"
            }`}
          >
            <div className="test-result-header">
              <span
                className={`test-result-status ${
                  testResult.passed ? "passed" : "failed"
                }`}
              >
                {testResult.passed ? "✓" : "✗"}
              </span>
              <span className="test-result-title">Test Case {index + 1}</span>
            </div>

            <div className="test-result-details">
              <div className="test-result-row">
                <strong>Input:</strong> <code>{testResult.testCase.input}</code>
              </div>
              <div className="test-result-row">
                <strong>Expected:</strong>{" "}
                <code>{testResult.testCase.expected}</code>
              </div>
              <div className="test-result-row">
                <strong>Actual:</strong>{" "}
                <code className={testResult.passed ? "success" : "error"}>
                  {testResult.actual}
                </code>
              </div>
              {testResult.error && (
                <div className="test-result-row error">
                  <strong>Error:</strong> {testResult.error}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {allPassed && (
        <div className="test-results-celebration">
          <div className="celebration-message">
            🎉 Congratulations! All tests passed!
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResults;
