# Changelog

All notable changes to the Staff Management project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Concurrent execution setup using `concurrently` package
- Root package.json scripts for running client and server simultaneously
- `npm start` command to run both client and server at the same time
- `npm run server` command to run only the server with nodemon
- `npm run client` command to run only the React client
- `npm run build` command to build the React client for production
- `npm run install-all` command to install dependencies for all projects
- CHANGELOG.md file for tracking project changes
- "How to Use" page with comprehensive user guide and instructions
- New navigation tab for accessing help and support documentation
- Step-by-step instructions for all application features
- Interactive accordion sections for detailed feature explanations
- Tips and best practices for using the system effectively

### Changed
- Updated root package.json to include project metadata and concurrent execution scripts
- Added concurrently as a dev dependency in the root package.json

### Fixed
- Fixed syntax error in Register.js component that was preventing user registration
- Corrected missing div element in animated background elements
- Resolved React component structure issues in registration form
- Fixed Git merge conflict markers in package.json that were causing JSON parsing errors
- Resolved npm install issues caused by invalid JSON structure

### Technical Details
- Server runs on development mode with nodemon for auto-restart
- Client runs on React development server
- Both processes run in parallel using concurrently package
- All dependencies installed for root, server, and client projects
- Registration form now properly connects to `/api/auth/lecturer/register` endpoint

---

## [Initial Setup] - YYYY-MM-DD
### Added
- Initial project structure with React frontend and Node.js backend
- Staff management functionality
- Authentication system
- Database models for Admin and Staff
- API routes for authentication and staff management
- React components for staff listing, adding staff, and login
- Bootstrap styling and modern UI components
