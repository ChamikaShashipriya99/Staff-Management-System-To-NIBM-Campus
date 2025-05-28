# 🏢 NIBM Staff Management System

## 📋 Overview

The NIBM Staff Management System is a comprehensive digital solution designed to streamline and modernize staff administration at NIBM Campus. This web-based platform provides a centralized system for managing all aspects of staff information, from personal details to professional documentation. Built with modern web technologies, it offers a secure, efficient, and user-friendly interface for administrators to handle staff-related operations seamlessly.

## ✨ Key Features

### Core Functionality
- **Staff Profile Management**
  - Complete staff information storage
  - Document management and storage
  - Professional history tracking
  - Contact information management

### Administrative Tools
- **Document Processing**
  - PDF report generation
  - Excel data export
  - Bulk data operations
  - Document version control

### User Experience
- **Modern Interface**
  - Responsive design for all devices
  - Intuitive navigation
  - Real-time data updates
  - Interactive dashboards

### System Features
- **Performance & Reliability**
  - Fast data retrieval
  - Automated backups
  - Error handling
  - System monitoring

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI development
- **Bootstrap 5** - Responsive design framework
- **React Router** - Navigation management
- **Axios** - API communication
- **React Toastify** - User notifications
- **jsPDF & XLSX** - Document generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload handling

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:
*   **Node.js**: (e.g., v14.x or later) - Download from [nodejs.org](https://nodejs.org/)
*   **npm**: (Node Package Manager) - Usually comes with Node.js.
*   **MongoDB**: (e.g., v4.x or later) - Download from [mongodb.com](https://www.mongodb.com/try/download/community)

## ⚙️ Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-name> # Usually NIBM-Staff-Management-System
    ```

2.  **Server Setup**:
    *   Navigate to the `server` directory:
        ```bash
        cd server
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   **MongoDB Connection**:
        The server uses `dotenv` to manage environment variables. The MongoDB connection string is expected in a `MONGO_URI` variable.
        Create a `.env` file in the `server` directory with your MongoDB connection string:
        ```env
        MONGO_URI=your_mongodb_connection_string_here
        PORT=5000 # Optional: specify a port for the server
        JWT_SECRET=your_jwt_secret_here # Replace with a strong secret
        ```
        Refer to `server/config/db.js` for the connection logic.
    *   **Initial Admin User (Optional)**:
        The script `server/scripts/createAdmin.js` can be used to create an initial admin user. After setting up your database and ensuring the server can connect to it, you can run this script:
        ```bash
        node scripts/createAdmin.js
        ```
        You might need to customize this script with desired admin credentials before running.

3.  **Client Setup**:
    *   Navigate to the `client` directory (from the project root):
        ```bash
        cd ../client # If you are in the server directory
        # or
        # cd client # If you are in the project root
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```

## ▶️ Running the Application

### Server
1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Start the server:
    *   For development with automatic restarts (using nodemon):
        ```bash
        npm run dev
        ```
    *   To start normally:
        ```bash
        npm start
        ```
    The server will typically run on the port specified in your `.env` file (e.g., `http://localhost:5000`).

### Client
1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Start the client application:
    ```bash
    npm start
    ```
    This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits.

## 📜 Available Scripts

### Client (`client/` directory)
*   `npm start`: Runs the app in development mode.
*   `npm test`: Launches the test runner in interactive watch mode.
*   `npm run build`: Builds the app for production to the `build` folder.
*   `npm run eject`: Removes the single dependency configuration (not recommended unless you know what you are doing).

### Server (`server/` directory)
*   `npm start`: Starts the server using `node index.js`.
*   `npm run dev`: Starts the server in development mode using `nodemon index.js` for automatic restarts on file changes.
*   `npm test`: (Currently prints "Error: no test specified" and exits) - You can define your test scripts here.
*   `node scripts/createAdmin.js`: Creates an initial admin user. Run this after setting up the database and configuring `server/.env`.

## 📁 Project Structure

```
NIBM-Staff-Management-System/
├── client/                     # React Frontend Application
│   ├── public/                 # Public assets (index.html, manifest.json, etc.)
│   ├── src/                    # Main source code for the React app
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Top-level page components
│   │   ├── services/           # API call services (e.g., Axios instances)
│   │   ├── App.js              # Main application component
│   │   └── index.js            # Entry point for React app
│   ├── package.json            # Client dependencies and scripts
│   └── ...
├── server/                     # Node.js Backend Application
│   ├── config/                 # Configuration files (e.g., db.js)
│   ├── controllers/            # Request handlers (logic for routes)
│   ├── middleware/             # Express middleware (e.g., auth)
│   ├── models/                 # Mongoose models for MongoDB schema
│   ├── routes/                 # API route definitions
│   ├── scripts/                # Utility scripts (e.g., createAdmin.js)
│   ├── .env.example            # Example environment file (if provided)
│   ├── index.js                # Entry point for the backend server
│   ├── package.json            # Server dependencies and scripts
│   └── ...
└── README.md                   # This file
```

## 🤝 Contributing

Contributions are welcome! Please follow the standard fork-branch-pull request workflow. More detailed contribution guidelines will be added soon.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. (It is assumed a LICENSE file will be added, if not, this statement is sufficient for now).
You can create a `LICENSE` file in the root of your project with the contents of the MIT License if you wish to include it.
