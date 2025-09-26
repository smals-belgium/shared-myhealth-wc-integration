# Guideline on registry (where to put component / NPM)

This document defines the requirements for web components intended for integration into our mobile application. 
Following these ensures performance, compatibility, and a seamless user experience.

## 1. Package Naming Requirements

- Packages must be named following this structure: `@company-name/web-component-name`  
Example: `@smals-belgium-shared/vidis-prescription-detail`
- Use **kebab-case** for web-component-name.
- Name should clearly describe the component’s function.

## 2. Technical Requirements

- **Performance:** Bundle size must be < **4MB gzipped**.
- **Build Output:** Components must be **ES modules** and **tree-shakeable** (no unnecessary static code).

## 3. Documentation Requirements

Each component must include:
- **README.md** with clear usage examples and API reference.
- **CHANGELOG.md** tracking all changes per version.
- **Props Table** listing properties, types, and default values.
- **Demo Page** demonstrating the component across different states and sizes. 
This page should be available in all 4 languages.

## 5. Publishing Process

- Complete all QA checks (tests, documentation, performance verification).
- Version the package following **semantic versioning** (semver).
- Publish to your NPM registry and verify that it is accessible from the mobile app (MAGS).

## 6. Ownership and Maintenance

- Each published component must have an assigned owner team.
- Ownership information (team name and contact details) must be included in the component’s metadata or documentation 
(e.g., in the README.md).
- Owners are responsible for maintenance, bug fixes, and updates.
