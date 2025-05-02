# Task Tracker Application

Task Tracker is a full-stack web application designed to help users manage projects and their associated tasks efficiently. Built with a React frontend and a Node.js/Express backend, it allows users to create, update, and delete projects and tasks, track task progress, and maintain a clean, user-friendly interface. The application uses MongoDB Atlas for cloud-based data storage and implements JWT-based authentication for secure user access.

## Features
User Authentication: Secure signup and login with JWT-based authentication.
Project Management:Create, view, and delete projects with titles and descriptions.
Navigate to a project's task list via a "View Tasks" button next to each project name.
Task Management: Add, edit, and delete tasks within a project.
Track task progress with statuses: "To Do", "In Progress", and "Done".
Record task creation and completion dates.
Edit tasks with a pre-filled form for quick updates.
Responsive Design: Clean and modern UI with consistent styling, optimized for desktop and mobile devices.
Navigation: Includes a "Back to Projects" button on task pages and a logout option for seamless user experience.

## Tech Stack
Frontend: React, React Router, JavaScript, CSS
Backend: Node.js, Express.js
Database: MongoDB (MongoDB Atlas)
Authentication: JSON Web Tokens (JWT)
Tools: Git, npm, MongoDB Compass

## Prerequisites
- Node.js (>= 14.x)
- MongoDB
- Docker (optional, for containerized deployment)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-tracker.git

   ```
   Set Up Backend:
   Navigate to the backend directory:
   ```bash
   cd backend
   ```
    Install dependencies:
    ```bash
   npm install
    ```
   Create a .env file in backend/ with:
    
   MONGO_URI=mongodb+srv://AyushVishu:<password>@cluster0.upfwi0z.mongodb.net/task-tracker?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   Replace <password> with your MongoDB Atlas user password.
   Generate your_jwt_secret_key using Node.js:
   ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Start the backend:
   ```bash
   npm run dev
   ``` 
   Set Up Frontend:
   Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
    Install dependencies:
    ```bash
    npm install
    ```
    Create a .env file in frontend/ (optional for local):
    REACT_APP_API_URL=http://localhost:5000
    Start the frontend:
    ```bash
    npm start
    ```
   Access the Application:
   Open http://localhost:3000 in your browser.
   Sign up at /signup or log in at /login (e.g., test@example.com, password123).
   
## ScreenShots
Below are screenshots of the Task Tracker application:
Login Page
![image](https://github.com/user-attachments/assets/b74f3277-2096-4499-a229-d48312e33f86)
The login page allows users to access their account securely.

Project List
![image](https://github.com/user-attachments/assets/03e6a4a3-867a-413e-839f-c72b71a606d7)
Displays all projects with titles, descriptions, and a "View Tasks" button.

Task List
![image](https://github.com/user-attachments/assets/e9331761-3513-4e56-81d5-4fc86d79d57d)
![image](https://github.com/user-attachments/assets/61043ba0-6086-417d-a163-942d89707fa2)
![image](https://github.com/user-attachments/assets/a245cca5-e81e-4a59-8524-34d963cf4076)


