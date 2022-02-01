export default {
  verbose: true,
  testRegex: '\\.test\\.ts$',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.ts'],
};
