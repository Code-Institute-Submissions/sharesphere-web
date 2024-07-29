import '@testing-library/jest-dom';
import {server} from './src/mocks/setupServer'

// API mock handling from:
// https://github.com/mr-fibonacci/moments/blob/be21d73ba17a071bfb941c9587575c0a9e10615b/src/setupTests.js#L11-L13
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios).
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
