module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: '<rootDir>/target/test-results/',
  testMatch: ['<rootDir>/src/**/@(*.)@(test.js?(x))'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
}