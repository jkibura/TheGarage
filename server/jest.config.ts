import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"], // Directories Jest should look for tests
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files with ts-jest
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Resolve @/ as src/ in imports
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // File extensions Jest should handle
};

export default config;
