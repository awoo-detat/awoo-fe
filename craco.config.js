/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./jsonconfig.json");

module.exports = {
  webpack: {
    alias: {
      "@assets/": path.resolve(__dirname, "assets/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@scss": path.resolve(__dirname, "src/scss"),
      "@slices": path.resolve(__dirname, "src/store/slices"),
    },
  },
  jest: {
    configure: {
      preset: "ts-jest",
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/src/",
      }),
    },
  },
};
