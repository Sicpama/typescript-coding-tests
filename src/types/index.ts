export interface TestCase {
  input: string;
  expected: string;
}

export interface TestResult {
  testCase: TestCase;
  actual: string;
  passed: boolean;
  error?: string;
}

export interface CodeExecutionResult {
  success: boolean;
  results: TestResult[];
  error?: string;
  compilationError?: string;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  example: string;
  template: string;
  solution: string;
  testCases: TestCase[];
}

export interface Test {
  title: string;
  duration: number;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: Question[];
}

export interface TestData {
  [key: number]: Test;
}

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
}

export interface TestState {
  currentTest: Test | null;
  currentQuestionIndex: number;
  userCode: string;
  startTime: number | null;
  timer: TimerState;
}
