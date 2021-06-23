module.exports = {
  roots: ['<rootDir>/main'],
  preset: 'ts-jest',
  testTimeout: 1000,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', '/assets'],
};

require('dotenv').config();
