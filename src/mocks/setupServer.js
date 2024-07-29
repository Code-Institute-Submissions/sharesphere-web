/* eslint-disable no-undef */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

// Ensure TextEncoder and TextDecoder are available globally before any tests run

// Set up the mock server
export const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios).
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
