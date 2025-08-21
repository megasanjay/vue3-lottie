# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.4.0] - 2024-01-XX

### Fixed

- **BREAKING**: Fixed Node.js 20+ compatibility issues by updating build configuration
  - Changed CommonJS build output from `.cjs.js` to `.cjs` extension
  - Updated package.json exports to use correct file extensions
  - This resolves the "exports is not defined" error when using Storybook v7+ on Node.js 20+
- Updated minimum Node.js version requirement to >=16

### Technical

- Updated Vite build configuration to properly handle ES modules and CommonJS formats
- Fixed package.json exports field to correctly reference build outputs
