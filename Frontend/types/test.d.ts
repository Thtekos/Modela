/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

declare global {
  // Jest globals
  const describe: jest.Describe;
  const it: jest.It;
  const test: jest.It;
  const expect: jest.Expect;
  const beforeAll: jest.Lifecycle;
  const afterAll: jest.Lifecycle;
  const beforeEach: jest.Lifecycle;
  const afterEach: jest.Lifecycle;
  const jest: typeof import('@jest/globals')['jest'];
  
  // Jest DOM matchers
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveStyle(style: Record<string, any>): R;
    }
  }
} 