/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Global error handling for debugging
if (__DEV__) {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    originalConsoleError('RN Error:', ...args);
  };
}

// Global error boundary for unhandled JavaScript errors
const errorHandler = (error, isFatal) => {
  if (__DEV__) {
    console.error('Global error handler:', error, 'Fatal:', isFatal);
  }
};

// Set global error handler
if (typeof global !== 'undefined') {
  global.ErrorUtils?.setGlobalHandler?.(errorHandler);
}

AppRegistry.registerComponent(appName, () => App);
