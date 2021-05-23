module.exports = {
  preset: "ts-jest",
  testRegex: "/tests/.*\\.test\\.tsx$",
  modulePathIgnorePatterns: ["<rootDir>/examples/"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
};
