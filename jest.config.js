/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require('ts-jest');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: ["."],
  moduleNameMapper: pathsToModuleNameMapper({
    "@src/*": ["src/*"],
    "@test/*": ["src/__tests__/*"],
    "@errors/*": ["src/errors/*"],
    "@controllers/*": ["src/controllers/*"],
    "@services/*": ["src/services/*"],
  }),
}