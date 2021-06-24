module.exports = {
  roots: ['<rootDir>/main'],
  preset: 'ts-jest',
  testTimeout: 190000,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', '/assets'],
};

require('dotenv').config();
