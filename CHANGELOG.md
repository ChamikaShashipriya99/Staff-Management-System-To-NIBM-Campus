# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
- Initial creation of CHANGELOG.md to record all future changes made by the assistant.
- Added 'concurrently' as a dependency in the root package.json.
- Added root-level 'start', 'client', and 'server' scripts to run both client and server together using 'concurrently'.
- Created Register.js page with the same styles as Login.js.
- Updated App.js to support toggling between Login and Register pages using state.
- Updated Login.js to include a Register link/button that switches to the Register page.
- Updated Register.js to match the Login page's style, icons, and structure, including input icons and card layout.
- Updated App.js to pass onShowLogin prop to Register for toggling between Login and Register pages.
- Updated registration to include Name and Lecturer ID fields, with full client-side and server-side validation.
- Updated Admin model and database to store name and lecturerId.
- Added password hashing and duplicate checks on server.
- Registration success now uses the same animation as Login.
- Registered users can now log in with their details.
- Register page now uses the exact same 3D animated background and CSS as the Login page for a consistent look.
- Fixed registration failure by installing and adding bcrypt to server dependencies for password hashing.
- Optimized staff fetching: now uses .lean() and selects only needed fields for faster loading after login.
- Created a separate Lecturer database/model and added registration and login endpoints for lecturers, with full validation and password hashing.
- Created a separate LecturerLogin page and updated App.js to support toggling between Admin and Lecturer login pages. Login.js now links to Lecturer login.
- Enabled navigation between Admin and Lecturer login pages with links/buttons on both forms. 