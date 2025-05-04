import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder and TextDecoder for jsdom
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Configure React 19 act environment
global.REACT_ACT_ENVIRONMENT = true;

// Suppress MUI Grid warnings
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0].includes('MUI Grid:') &&
    (args[0].includes('The `item` prop has been removed') ||
      args[0].includes('The `xs` prop has been removed') ||
      args[0].includes('The `sm` prop has been removed') ||
      args[0].includes('The `md` prop has been removed'))
  ) {
    return;
  }
  originalConsoleWarn(...args);
};