import type { TestData } from "../types";

export const testData: TestData = {
  1: {
    title: "Basic TypeScript Functions",
    duration: 15,
    difficulty: "Easy",
    questions: [
      {
        id: 1,
        title: "Sum Two Numbers",
        description:
          "Write a function that takes two numbers and returns their sum.",
        example: "sum(2, 3) should return 5",
        template: `function sum(a: number, b: number): number {
  // Your code here
}`,
        solution: `function sum(a: number, b: number): number {
  return a + b;
}`,
        testCases: [
          { input: "sum(2, 3)", expected: "5" },
          { input: "sum(-1, 1)", expected: "0" },
          { input: "sum(0, 0)", expected: "0" },
        ],
      },
      {
        id: 2,
        title: "Check Even Number",
        description:
          "Write a function that returns true if a number is even, false otherwise.",
        example: "isEven(4) should return true",
        template: `function isEven(num: number): boolean {
  // Your code here
}`,
        solution: `function isEven(num: number): boolean {
  return num % 2 === 0;
}`,
        testCases: [
          { input: "isEven(4)", expected: "true" },
          { input: "isEven(3)", expected: "false" },
          { input: "isEven(0)", expected: "true" },
        ],
      },
    ],
  },
  2: {
    title: "Array Operations",
    duration: 15,
    difficulty: "Easy",
    questions: [
      {
        id: 3,
        title: "Find Maximum",
        description:
          "Write a function that finds the maximum number in an array.",
        example: "findMax([1, 3, 2]) should return 3",
        template: `function findMax(nums: number[]): number {
  // Your code here
}`,
        solution: `function findMax(nums: number[]): number {
  return Math.max(...nums);
}`,
        testCases: [
          { input: "findMax([1, 3, 2])", expected: "3" },
          { input: "findMax([-1, -3, -2])", expected: "-1" },
          { input: "findMax([5])", expected: "5" },
        ],
      },
      {
        id: 4,
        title: "Array Sum",
        description:
          "Write a function that calculates the sum of all numbers in an array.",
        example: "arraySum([1, 2, 3]) should return 6",
        template: `function arraySum(nums: number[]): number {
  // Your code here
}`,
        solution: `function arraySum(nums: number[]): number {
  return nums.reduce((sum, num) => sum + num, 0);
}`,
        testCases: [
          { input: "arraySum([1, 2, 3])", expected: "6" },
          { input: "arraySum([])", expected: "0" },
          { input: "arraySum([-1, 1])", expected: "0" },
        ],
      },
    ],
  },
  3: {
    title: "String Manipulation",
    duration: 15,
    difficulty: "Medium",
    questions: [
      {
        id: 5,
        title: "Reverse String",
        description: "Write a function that reverses a string.",
        example: "reverseString('hello') should return 'olleh'",
        template: `function reverseString(str: string): string {
  // Your code here
}`,
        solution: `function reverseString(str: string): string {
  return str.split('').reverse().join('');
}`,
        testCases: [
          { input: "reverseString('hello')", expected: "'olleh'" },
          { input: "reverseString('a')", expected: "'a'" },
          { input: "reverseString('')", expected: "''" },
        ],
      },
      {
        id: 6,
        title: "Check Palindrome",
        description:
          "Write a function that checks if a string is a palindrome (reads the same forwards and backwards).",
        example: "isPalindrome('racecar') should return true",
        template: `function isPalindrome(str: string): boolean {
  // Your code here
}`,
        solution: `function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}`,
        testCases: [
          { input: "isPalindrome('racecar')", expected: "true" },
          { input: "isPalindrome('hello')", expected: "false" },
          {
            input: "isPalindrome('A man a plan a canal Panama')",
            expected: "true",
          },
        ],
      },
    ],
  },
  4: {
    title: "Object-Oriented Programming",
    duration: 15,
    difficulty: "Medium",
    questions: [
      {
        id: 7,
        title: "Create a Person Class",
        description:
          "Create a Person class with name and age properties, and a greet method.",
        example:
          "new Person('Alice', 30).greet() should return 'Hello, I am Alice and I am 30 years old.'",
        template: `class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    // Your code here
  }

  greet(): string {
    // Your code here
  }
}`,
        solution: `class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return 'Hello, I am ' + this.name + ' and I am ' + this.age + ' years old.';
  }
}`,
        testCases: [
          {
            input: "new Person('Alice', 30).greet()",
            expected: 'Hello, I am Alice and I am 30 years old.',
          },
          {
            input: "new Person('Bob', 25).greet()",
            expected: 'Hello, I am Bob and I am 25 years old.',
          },
        ],
      },
      {
        id: 8,
        title: "Rectangle Class",
        description:
          "Create a Rectangle class with width and height properties, and methods to calculate area and perimeter.",
        example: "new Rectangle(4, 5).getArea() should return 20",
        template: `class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    // Your code here
  }

  getArea(): number {
    // Your code here
  }

  getPerimeter(): number {
    // Your code here
  }
}`,
        solution: `class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}`,
        testCases: [
          { input: "new Rectangle(4, 5).getArea()", expected: "20" },
          { input: "new Rectangle(4, 5).getPerimeter()", expected: "18" },
          { input: "new Rectangle(3, 3).getArea()", expected: "9" },
        ],
      },
    ],
  },
  5: {
    title: "Algorithm Challenges",
    duration: 15,
    difficulty: "Hard",
    questions: [
      {
        id: 9,
        title: "Fibonacci Sequence",
        description:
          "Write a function that returns the nth number in the Fibonacci sequence.",
        example: "fibonacci(6) should return 8 (sequence: 0, 1, 1, 2, 3, 5, 8)",
        template: `function fibonacci(n: number): number {
  // Your code here
}`,
        solution: `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
        testCases: [
          { input: "fibonacci(0)", expected: "0" },
          { input: "fibonacci(1)", expected: "1" },
          { input: "fibonacci(6)", expected: "8" },
        ],
      },
      {
        id: 10,
        title: "Binary Search",
        description:
          "Implement binary search to find the index of a target value in a sorted array.",
        example: "binarySearch([1, 3, 5, 7, 9], 5) should return 2",
        template: `function binarySearch(arr: number[], target: number): number {
  // Your code here
  // Return -1 if target is not found
}`,
        solution: `function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}`,
        testCases: [
          { input: "binarySearch([1, 3, 5, 7, 9], 5)", expected: "2" },
          { input: "binarySearch([1, 3, 5, 7, 9], 1)", expected: "0" },
          { input: "binarySearch([1, 3, 5, 7, 9], 10)", expected: "-1" },
        ],
      },
    ],
  },
  6: {
    title: "Data Structures",
    duration: 15,
    difficulty: "Medium",
    questions: [
      {
        id: 11,
        title: "Stack Implementation",
        description:
          "Implement a basic stack with push, pop, and peek methods.",
        example: "stack.push(1); stack.push(2); stack.peek() should return 2",
        template: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    // Your code here
  }

  pop(): T | undefined {
    // Your code here
  }

  peek(): T | undefined {
    // Your code here
  }

  isEmpty(): boolean {
    // Your code here
  }
}`,
        solution: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}`,
        testCases: [
          {
            input: "const s = new Stack(); s.push(1); s.push(2); s.peek()",
            expected: "2",
          },
          { input: "const s = new Stack(); s.push(1); s.pop()", expected: "1" },
          { input: "const s = new Stack(); s.isEmpty()", expected: "true" },
        ],
      },
      {
        id: 12,
        title: "Queue Implementation",
        description: "Implement a basic queue with enqueue, dequeue methods.",
        example:
          "queue.enqueue(1); queue.enqueue(2); queue.dequeue() should return 1",
        template: `class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    // Your code here
  }

  dequeue(): T | undefined {
    // Your code here
  }

  front(): T | undefined {
    // Your code here
  }

  isEmpty(): boolean {
    // Your code here
  }
}`,
        solution: `class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}`,
        testCases: [
          {
            input:
              "const q = new Queue(); q.enqueue(1); q.enqueue(2); q.dequeue()",
            expected: "1",
          },
          {
            input: "const q = new Queue(); q.enqueue(1); q.front()",
            expected: "1",
          },
          { input: "const q = new Queue(); q.isEmpty()", expected: "true" },
        ],
      },
    ],
  },
  7: {
    title: "Advanced Functions",
    duration: 15,
    difficulty: "Hard",
    questions: [
      {
        id: 13,
        title: "Debounce Function",
        description:
          "Implement a debounce function that delays the execution of a function until after a specified delay.",
        example:
          "const debounced = debounce(() => console.log('Hello'), 1000);",
        template: `function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  // Your code here
}`,
        solution: `function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}`,
        testCases: [
          { input: "typeof debounce(() => {}, 100)", expected: "'function'" },
        ],
      },
      {
        id: 14,
        title: "Curry Function",
        description:
          "Implement a curry function that transforms a function to be callable with partial arguments.",
        example:
          "const add = curry((a, b, c) => a + b + c); add(1)(2)(3) should return 6",
        template: `function curry<T extends (...args: any[]) => any>(fn: T): any {
  // Your code here
}`,
        solution: `function curry<T extends (...args: any[]) => any>(fn: T): any {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs: any[]) => curried(...args, ...nextArgs);
  };
}`,
        testCases: [
          {
            input: "const add = curry((a, b, c) => a + b + c); add(1)(2)(3)",
            expected: "6",
          },
          {
            input: "const add = curry((a, b) => a + b); add(1, 2)",
            expected: "3",
          },
        ],
      },
    ],
  },
  8: {
    title: "Async Programming",
    duration: 15,
    difficulty: "Hard",
    questions: [
      {
        id: 15,
        title: "Promise Chain",
        description:
          "Write a function that creates a promise chain to fetch and process data.",
        example: "processData(5) should return a promise that resolves to 15",
        template: `async function processData(input: number): Promise<number> {
  // Your code here
  // Simulate: fetch data -> double it -> add 5
}`,
        solution: `async function processData(input: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const doubled = input * 2;
      const result = doubled + 5;
      resolve(result);
    }, 100);
  });
}`,
        testCases: [
          { input: "await processData(5)", expected: "15" },
          { input: "await processData(0)", expected: "5" },
        ],
      },
      {
        id: 16,
        title: "Async Map",
        description:
          "Implement an async version of Array.map that processes promises in parallel.",
        example:
          "asyncMap([1, 2, 3], async x => x * 2) should resolve to [2, 4, 6]",
        template: `async function asyncMap<T, U>(
  array: T[],
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  // Your code here
}`,
        solution: `async function asyncMap<T, U>(
  array: T[],
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  return Promise.all(array.map(callback));
}`,
        testCases: [
          {
            input: "await asyncMap([1, 2], async x => x * 2)",
            expected: "[2, 4]",
          },
        ],
      },
    ],
  },
};
