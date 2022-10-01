module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/coverage/',
  testMatch: ['<rootDir>/src/**/@(*.)@(test.js?(x))'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
}