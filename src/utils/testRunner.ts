import type { CodeExecutionResult, TestCase, TestResult } from "../types";

/**
 * Safely evaluates JavaScript code in a sandboxed environment
 */
function safeEval(code: string): any {
  try {
    // Remove TypeScript-specific syntax for execution
    const jsCode = code
      .replace(/:\s*number/g, '')
      .replace(/:\s*string/g, '')
      .replace(/:\s*boolean/g, '')
      .replace(/:\s*any/g, '')
      .replace(/:\s*void/g, '')
      .replace(/:\s*Array<\w+>/g, '')
      .replace(/:\s*\w+\[\]/g, '')
      .replace(/:\s*object/g, '')
      .replace(/:\s*unknown/g, '');

    // Extract function and class names from the code before executing
    const exportNames: string[] = [];
    
    // Match function declarations
    const functionPattern = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    let match;
    while ((match = functionPattern.exec(jsCode)) !== null) {
      exportNames.push(match[1]);
    }
    
    // Match arrow functions assigned to variables
    const arrowFunctionPattern = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\([^)]*\)\s*=>/g;
    while ((match = arrowFunctionPattern.exec(jsCode)) !== null) {
      exportNames.push(match[1]);
    }
    
    // Match class declarations
    const classPattern = /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    while ((match = classPattern.exec(jsCode)) !== null) {
      exportNames.push(match[1]);
    }

    // Create a new function to execute the code in a controlled environment
    const func = new Function(`
      "use strict";
      ${jsCode}
      
      // Return an object with all declared functions
      const exports = {};
      
      // Export the functions and classes we found
      const exportNames = ${JSON.stringify(exportNames)};
      
      exportNames.forEach(name => {
        try {
          const item = eval(name);
          if (typeof item === 'function') {
            exports[name] = item;
          }
        } catch (e) {
          // Item might not be in scope, skip it
        }
      });
      
      return exports;
    `);
    
    return func();
  } catch (error) {
    throw new Error(`Code compilation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Evaluates a test case input and returns the result
 */
function evaluateTestCase(exports: any, testInput: string): any {
  try {
    // Create a safe evaluation environment with the exported functions
    const func = new Function(...Object.keys(exports), `
      "use strict";
      return ${testInput};
    `);
    
    return func(...Object.values(exports));
  } catch (error) {
    throw new Error(`Test evaluation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Converts a value to a string representation for comparison
 */
function valueToString(value: any): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return `[${value.map(v => valueToString(v)).join(", ")}]`;
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

/**
 * Runs all test cases against the provided code
 */
export function runTests(code: string, testCases: TestCase[]): CodeExecutionResult {
  try {
    // Validate that code is not empty
    if (!code.trim()) {
      return {
        success: false,
        results: [],
        compilationError: "Please write some code before running tests.",
      };
    }

    // First, try to execute the user's code
    const exports = safeEval(code);
    
    // Check if any functions or classes were exported
    if (Object.keys(exports).length === 0) {
      return {
        success: false,
        results: [],
        compilationError: "No functions or classes found in your code. Make sure you have defined the required function or class.",
      };
    }
    
    const results: TestResult[] = [];
    
    // Run each test case
    for (const testCase of testCases) {
      try {
        const actual = evaluateTestCase(exports, testCase.input);
        const actualString = valueToString(actual);
        const passed = actualString === testCase.expected;
        
        results.push({
          testCase,
          actual: actualString,
          passed,
        });
      } catch (error) {
        results.push({
          testCase,
          actual: "Error",
          passed: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
    
    return {
      success: true,
      results,
    };
  } catch (error) {
    return {
      success: false,
      results: [],
      compilationError: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Validates TypeScript syntax (basic check)
 */
export function validateTypeScript(code: string): { valid: boolean; error?: string } {
  try {
    // Basic syntax validation
    new Function(code);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
